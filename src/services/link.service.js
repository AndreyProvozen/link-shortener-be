import { LINK_REGEXP } from "../constants/regexp.js";
import Link from "../models/Link.js";
import CustomError from "../utils/customError.js";
import UserService from "./user.service.js";

class LinkService {
  async create(url, email) {
    if (!LINK_REGEXP.test(url)) {
      throw new CustomError("Invalid URL. Please provide a valid URL.", 400);
    }

    const isExistingLink = await Link.findOne({ url });

    if (isExistingLink) throw new CustomError("URL already exists", 409);

    const createdLink = await Link.create({ url });

    await UserService.addLinkToUser(email, createdLink.code);

    return createdLink;
  }

  async getOne(code) {
    const link = await Link.findOne({ code });
    return link;
  }

  async delete(code, email) {
    const link = await Link.findOneAndDelete({ code });

    if (!link) throw new CustomError("Link not found", 404);

    await UserService.removeLinkFromUser(email, code);

    return link;
  }

  async getAll(email) {
    const user = await UserService.findUserByEmail(email);
    const links = await Link.find({ code: { $in: user.userLinks } });

    return links;
  }
}

export default new LinkService();
