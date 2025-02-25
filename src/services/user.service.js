import User from "../models/User.js";
import CustomError from "../utils/customError.js";

class UserService {
  async create(userData) {
    const { email, name, image } = userData;

    const user = await User.create({ email, name, image });
    return user;
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async addLinkToUser(email, linkCode) {
    if (!email || !linkCode) {
      throw new CustomError("Email and linkCode are required", 400);
    }

    const user = await this.findUserByEmail(email);

    user.userLinks.push(linkCode);
    await user.save();

    return user;
  }

  async removeLinkFromUser(email, linkCode) {
    if (!email || !linkCode) {
      throw new CustomError("Email and linkCode are required", 400);
    }

    const user = await this.findUserByEmail(email);

    user.userLinks = user.userLinks.filter((code) => code !== linkCode);
    await user.save();

    return user;
  }
}

export default new UserService();
