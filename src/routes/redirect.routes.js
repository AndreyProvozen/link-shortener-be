import Router from "express";
import RedirectController from "../controllers/redirect.controller.js";
import { param } from "express-validator";
import { LINK_CODE_REGEXP } from "../constants/regexp.js";

const router = new Router();

const validateLinkCode = param("code").matches(LINK_CODE_REGEXP);

router.get("/:code", validateLinkCode, RedirectController.redirectToFullLink);

export default router;
