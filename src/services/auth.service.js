import { nanoid } from "nanoid";
import User from "../models/User.js";
import CustomError from "../utils/customError.js";
import bcrypt from "bcrypt";
import mailService from "./mail.service.js";
import tokenService from "./token.service.js";
import UserDto from "../dto/user.dto.js";

class AuthService {
  async signup({ email, password }) {
    const candidate = await User.findOne({ email });
    if (candidate) throw CustomError.Conflict("User already exists");

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = nanoid();

    const user = await User.create({ email, password: hashedPassword, activationLink });
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) throw CustomError.BadRequest("Invalid activation link");

    user.isActivated = true;
    await user.save();
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw CustomError.BadRequest("User not found");
    if (!user.isActivated) throw CustomError.BadRequest("User is not activated");

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw CustomError.BadRequest("Invalid password");

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw CustomError.UnauthorizedError();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const user = await User.findById(userData.id);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) throw CustomError.UnauthorizedError();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export default new AuthService();
