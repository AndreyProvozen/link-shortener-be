import LinkService from "../services/link.service.js";
import errorWrapper from "../utils/errorWrapper.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

class LinkController {
  createLink = errorWrapper(async (req, res, next) => {
    handleValidationErrors(req, next);

    const shortLinkData = await LinkService.createLink({ url: req.body.url, email: req.user.email });

    res.status(201).json(shortLinkData);
  });

  getLinkByCode = errorWrapper(async (req, res, next) => {
    handleValidationErrors(req, next);

    const link = await LinkService.getLinkByCode(req.params.code);

    res.json(link);
  });

  deleteLink = errorWrapper(async (req, res, next) => {
    handleValidationErrors(req, next);

    const deletedLink = await LinkService.deleteLink(req.params.code, req.user.email);

    res.json(deletedLink);
  });

  getUserLinks = errorWrapper(async (req, res, next) => {
    handleValidationErrors(req, next);

    const links = await LinkService.getUserLinks({ email: req.user.email, ...req.query });

    res.json(links);
  });
}

export default new LinkController();
