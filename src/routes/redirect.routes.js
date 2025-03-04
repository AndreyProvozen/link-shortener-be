import Router from "express";
import RedirectController from "../controllers/redirect.controller.js";
import { param } from "express-validator";
import { LINK_CODE_REGEXP } from "../constants/regexp.js";

const router = new Router();

router.get("/:code", param("code").matches(LINK_CODE_REGEXP), RedirectController.redirectToFullLink);

export default router;
