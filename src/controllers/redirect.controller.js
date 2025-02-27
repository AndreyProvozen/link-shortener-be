import redirectService from "../services/redirect.service.js";
import errorWrapper from "../utils/errorWrapper.js";

class RedirectController {
  redirectToFullLink = errorWrapper(async ({ params }, res) => {
    const fullLink = await redirectService.redirectToFullLink(params);
    res.redirect(fullLink);
  });
}

export default new RedirectController();
