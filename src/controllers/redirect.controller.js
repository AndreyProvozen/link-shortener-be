import { validationResult } from "express-validator";
import redirectService from "../services/redirect.service.js";
import errorWrapper from "../utils/errorWrapper.js";
import CustomError from "../utils/customError.js";

class RedirectController {
  redirectToFullLink = errorWrapper(async (req, res, next) => {
    const { params, headers, socket } = req;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(CustomError.BadRequest("Validation error", errors.array()));
    }

    const fullLink = await redirectService.redirectToFullLink({
      userAgent: headers["user-agent"],
      acceptLanguage: headers["accept-language"],
      code: params.code,
      remoteAddress: socket.remoteAddress,
    });

    res.setHeader("Cache-Control", "no-cache, max-age=0");
    res.redirect(301, fullLink);
  });
}

export default new RedirectController();
