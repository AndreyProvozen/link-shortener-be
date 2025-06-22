import redirectService from "../services/redirect.service.js";
import errorWrapper from "../utils/errorWrapper.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

class RedirectController {
  redirectToFullLink = errorWrapper(async (req, res, next) => {
    handleValidationErrors(req, next);

    const { params, headers, socket } = req;

    const fullLink = await redirectService.redirectToFullLink({
      userAgent: headers["user-agent"],
      acceptLanguage: headers["accept-language"],
      code: params.code,
      remoteAddress: socket.remoteAddress,
    });

    res.redirect(301, fullLink);
  });
}

export default new RedirectController();
