import User from "../models/User.js";

class UserService {
  async addLinkToUser(email, linkCode) {
    const user = await User.findOne({ email });
    user.userLinks.push(linkCode);

    await user.save();
    return user;
  }

  async removeLinkFromUser(email, linkCode) {
    const user = await User.findOne({ email });
    user.userLinks = user.userLinks.filter(code => code !== linkCode);

    await user.save();
    return user;
  }
}

export default new UserService();
