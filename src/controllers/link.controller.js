import LinkService from "../services/link.service.js";
import errorWrapper from "../utils/errorWrapper.js";

class LinkController {
  create = errorWrapper(async (req, res) => {
    const { url, email } = req.body;

    const shortLinkData = await LinkService.create(url, email);
    res.json(shortLinkData);
  });

  getOne = errorWrapper(async (req, res) => {
    const { code } = req.params;

    const link = await LinkService.getOne(code);
    res.json(link);
  });

  delete = errorWrapper(async (req, res) => {
    const { code } = req.params;
    const { email } = req.body;

    const deletedLink = await LinkService.delete(code, email);
    res.json(deletedLink);
  });

  getAll = errorWrapper(async (req, res) => {
    const { email } = req.query;

    const links = await LinkService.getAll(email);
    res.json(links);
  });
}

export default new LinkController();
