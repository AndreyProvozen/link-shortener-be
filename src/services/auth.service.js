import { nanoid } from "nanoid";
import User from "../models/User.js";
import CustomError from "../utils/customError.js";
import bcrypt from "bcrypt";
import mailService from "./mail.service.js";
import tokenService from "./token.service.js";
import UserDto from "../dto/user.dto.js";
import { BCRYPT_SALT_ROUNDS } from "../constants/global.js";

class AuthService {
  generateAuthResponse(user) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async signup({ email, password, username }) {
    const [existingEmail, existingUsername, hashedPassword] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ username }),
      bcrypt.hash(password, BCRYPT_SALT_ROUNDS),
    ]);

    if (existingEmail) throw CustomError.Conflict("User with this email already exists");
    if (existingUsername) throw CustomError.Conflict("Username is already taken");

    const activationLink = nanoid();
    const user = await User.create({ email, password: hashedPassword, username, activationLink });
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    return this.generateAuthResponse(user);
  }
  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) throw CustomError.BadRequest("Invalid activation link");

    user.isActivated = true;
    user.activationLink = null;

    await user.save();
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw CustomError.BadRequest("User not found");
    if (!user.isActivated) throw CustomError.BadRequest("User is not activated");

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw CustomError.BadRequest("Invalid password");

    return this.generateAuthResponse(user);
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) throw CustomError.UnauthorizedError();

    const user = await User.findById(userData.id);
    return this.generateAuthResponse(user);
  }
}

export default new AuthService();
