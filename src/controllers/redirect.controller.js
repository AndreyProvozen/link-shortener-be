import redirectService from "../services/redirect.service.js";
import errorWrapper from "../utils/errorWrapper.js";

class RedirectController {
  redirectToFullLink = errorWrapper(async ({ params, headers, socket }, res) => {
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
