import { nanoid } from "nanoid";
import { LINK_REGEXP } from "../constants/regexp.js";
import Link from "../models/Link.js";
import CustomError from "../utils/customError.js";
import UserService from "./user.service.js";

class LinkService {
  async createLink({ url, email }) {
    if (!LINK_REGEXP.test(url)) throw CustomError.BadRequest("Invalid URL. Please provide a valid URL.");

    const isExistingLink = await Link.findOne({ url });
    if (isExistingLink) throw CustomError.Conflict("URL already exists");

    const createdLink = await Link.create({ url, code: `ls-${nanoid(7)}` });

    await UserService.addLinkToUser(email, createdLink.code);

    return createdLink;
  }

  async getLinkByCode(code) {
    const link = await Link.findOne({ code });
    if (!link) throw CustomError.NotFound("Link not found");

    return link;
  }

  async deleteLink(code, email) {
    const link = await Link.findOneAndDelete({ code });
    if (!link) throw CustomError.NotFound("Link not found");

    await UserService.removeLinkFromUser(email, code);

    return link;
  }

  async getUserLinks({ email, limit = 10, offset = 0, searchString = "" }) {
    const offsetNumber = parseInt(offset, 10) ? offset * limit : 0;

    const user = await UserService.findUserByEmail(email);
    const query = { code: { $in: user.userLinks } };

    if (searchString.trim()) {
      const searchTerm = searchString.toLowerCase();
      query.code = { $in: user.userLinks.filter(code => code.toLowerCase().includes(searchTerm)) };
    }

    const links = await Link.find(query).skip(offsetNumber).limit(limit);

    return { data: links, totalCount: user.userLinks.length };
  }
}

export default new LinkService();
