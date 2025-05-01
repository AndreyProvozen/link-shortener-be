import Router from "express";
import LinkController from "../controllers/link.controller.js";
import { body, param, query } from "express-validator";
import { LINK_CODE_REGEXP } from "../constants/regexp.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = new Router();

const validateLinkCode = param("code").matches(LINK_CODE_REGEXP);
const validatePagination = [
  query("limit").optional().isInt(),
  query("offset").optional().isInt(),
  query("searchString").optional().isString().trim(),
];

router.get("/links/:code", authMiddleware, validateLinkCode, LinkController.getLinkByCode);
router.get("/links", authMiddleware, validatePagination, LinkController.getUserLinks);
router.post("/links", authMiddleware, body("url").isURL(), LinkController.createLink);
router.delete("/links/:code", authMiddleware, validateLinkCode, LinkController.deleteLink);

export default router;
