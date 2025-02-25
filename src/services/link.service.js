import { LINK_REGEXP } from "../constants/regexp.js";
import Link from "../models/Link.js";
import CustomError from "../utils/customError.js";

class LinkService {
  async create(url) {
    if (!LINK_REGEXP.test(url)) {
      throw new CustomError("Invalid URL. Please provide a valid URL.", 400);
    }

    const isExistingLink = await Link.findOne({ url });

    if (isExistingLink) {
      throw new CustomError("URL already exists", 409);
    }

    const createdLink = await Link.create({ url });
    return createdLink;
  }

  async getAll() {}

  async getOne(id) {}

  async update(post) {}

  async delete(id) {}
}

export default new LinkService();
