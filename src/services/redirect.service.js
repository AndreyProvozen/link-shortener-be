import { LINK_CODE_REGEXP } from "../constants/regexp.js";
import Link from "../models/Link.js";
import CustomError from "../utils/customError.js";

class RedirectService {
  async redirectToFullLink({ code }) {
    if (!LINK_CODE_REGEXP.test(code)) {
      throw new CustomError("Invalid code format", 400);
    }

    const link = await Link.findOne({ code });

    if (!link) throw new CustomError("Link not found", 404);

    return link.url;
  }
}

export default new RedirectService();
