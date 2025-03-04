import { EMAIL_REGEXP } from "../constants/regexp.js";
import User from "../models/User.js";
import CustomError from "../utils/customError.js";

class UserService {
  async create({ email, name, image }) {
    if (!EMAIL_REGEXP.test(email)) throw CustomError.BadRequest("Invalid email address");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw CustomError.Conflict("User already exists");

    const user = await User.create({ email, name, image });
    return user;
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ email });
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
