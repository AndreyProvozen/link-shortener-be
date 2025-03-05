import { validationResult } from "express-validator";
import LinkService from "../services/link.service.js";
import errorWrapper from "../utils/errorWrapper.js";
import CustomError from "../utils/customError.js";

class LinkController {
  createLink = errorWrapper(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(CustomError.BadRequest("Validation error", errors.array()));
    }

    const shortLinkData = await LinkService.createLink(req.body);
    res.status(201).json(shortLinkData);
  });

  getLinkByCode = errorWrapper(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(CustomError.BadRequest("Validation error", errors.array()));
    }

    const link = await LinkService.getLinkByCode(req.params.code);
    res.json(link);
  });

  deleteLink = errorWrapper(async (req, res, next) => {
    const { params, body } = req;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(CustomError.BadRequest("Validation error", errors.array()));
    }

    const deletedLink = await LinkService.deleteLink(params.code, body.email);
    res.json(deletedLink);
  });

  getUserLinks = errorWrapper(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(CustomError.BadRequest("Validation error", errors.array()));
    }

    const links = await LinkService.getUserLinks(req.query);
    res.json(links);
  });
}

export default new LinkController();
