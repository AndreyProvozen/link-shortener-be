import { nanoid } from "nanoid";
import Link from "../models/Link.js";
import CustomError from "../utils/customError.js";
import UserService from "./user.service.js";
import User from "../models/User.js";
import { DEFAULT_LIMIT, NANOID_CODE_LENGTH } from "../constants/global.js";

class LinkService {
  async createLink({ url, email }) {
    const isExistingLink = await Link.exists({ url });
    if (isExistingLink) throw CustomError.Conflict("URL already exists");

    const createdLink = await Link.create({ url, code: `ls-${nanoid(NANOID_CODE_LENGTH)}` });
    await UserService.addLinkToUser(email, createdLink.code);

    return createdLink;
  }

  async getLinkByCode(code) {
    const link = await Link.findOne({ code });
    if (!link) throw CustomError.NotFound("Link not found");

    return link;
  }

  async deleteLink(code, email) {
    const user = await User.findOne({ email });
    if (!user?.userLinks.includes(code)) throw CustomError.Forbidden("You don't have access to this link");

    const link = await Link.findOneAndDelete({ code });
    if (!link) throw CustomError.NotFound("Link not found");

    await UserService.removeLinkFromUser(email, code);
    return link;
  }

  async getUserLinks({ favoriteList = [], email, limit = DEFAULT_LIMIT, offset = 0, searchString = "", favorite }) {
    const isFavorite = favorite === "true";
    const offsetNumber = Number(offset) > 0 ? offset * limit : 0;

    const user = await User.findOne({ email });

    const baseList = isFavorite ? favoriteList : user.userLinks;
    let filteredCodes = baseList;

    if (searchString.trim()) {
      const searchTerm = searchString.toLowerCase();
      filteredCodes = baseList.filter(code => code.toLowerCase().includes(searchTerm));
    }

    const query = { code: { $in: filteredCodes } };
    const links = await Link.find(query).skip(offsetNumber).limit(limit);

    return { data: links, totalCount: filteredCodes.length };
  }
}

export default new LinkService();
