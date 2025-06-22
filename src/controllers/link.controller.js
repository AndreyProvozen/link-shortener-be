import { FAVORITE_LIST_KEY } from "../constants/global.js";
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
    const favoriteList = JSON.parse(req.cookies[FAVORITE_LIST_KEY]) || [];

    const links = await LinkService.getUserLinks({ favoriteList, email: req.user.email, ...req.query });

    res.json(links);
  });
}

export default new LinkController();
