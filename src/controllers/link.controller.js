import LinkService from "../services/link.service.js";
import errorWrapper from "../utils/errorWrapper.js";

class LinkController {
  createLink = errorWrapper(async ({ body }, res) => {
    const shortLinkData = await LinkService.createLink(body);
    res.status(201).json(shortLinkData);
  });

  getLinkByCode = errorWrapper(async ({ params }, res) => {
    const link = await LinkService.getLinkByCode(params.code);
    res.json(link);
  });

  deleteLink = errorWrapper(async ({ params, body }, res) => {
    const deletedLink = await LinkService.deleteLink(params.code, body.email);
    res.json(deletedLink);
  });

  getUserLinks = errorWrapper(async ({ query }, res) => {
    const links = await LinkService.getUserLinks(query.email);
    res.json(links);
  });
}

export default new LinkController();
