import Router from "express";
import LinkController from "../controllers/link.controller.js";
import { body, param, query } from "express-validator";
import { LINK_CODE_REGEXP } from "../constants/regexp.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = new Router();

router.get("/links/:code", authMiddleware, param("code").matches(LINK_CODE_REGEXP), LinkController.getLinkByCode);
router.get(
  "/links",
  authMiddleware,
  query("email").isEmail(),
  query("limit").optional().isInt(),
  query("offset").optional().isInt(),
  query("searchString").optional().isString().trim(),
  LinkController.getUserLinks
);
router.post("/links", authMiddleware, body("email").isEmail(), body("url").isURL(), LinkController.createLink);
router.delete("/links/:code", authMiddleware, param("code").matches(LINK_CODE_REGEXP), LinkController.deleteLink);

export default router;
