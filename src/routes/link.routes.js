import Router from "express";
import LinkController from "../controllers/link.controller.js";

const router = new Router();

router.post("/links", LinkController.createLink);
router.get("/links/:code", LinkController.getLinkByCode);
router.get("/links", LinkController.getUserLinks);
router.delete("/links/:code", LinkController.deleteLink);

export default router;
