import { EMAIL_REGEXP } from "../constants/regexp.js";
import User from "../models/User.js";
import CustomError from "../utils/customError.js";

class UserService {
  async create({ email, name, image }) {
    if (!EMAIL_REGEXP.test(email)) {
      throw new CustomError("Invalid email address", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new CustomError("User already exists", 409);

    const user = await User.create({ email, name, image });
    return user;
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("User not found", 404);

    return user;
  }

  async addLinkToUser(email, linkCode) {
    const user = await this.findUserByEmail(email);

    user.userLinks.push(linkCode);
    await user.save();

    return user;
  }

  async removeLinkFromUser(email, linkCode) {
    const user = await this.findUserByEmail(email);

    user.userLinks = user.userLinks.filter(code => code !== linkCode);
    await user.save();

    return user;
  }
}

export default new UserService();
