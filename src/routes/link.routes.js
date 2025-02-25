import Router from "express";
import LinkController from "../controllers/link.controller.js";

const router = new Router();

router.post("/links", LinkController.create);
router.get("/links/:code", LinkController.getOne);
router.get("/links", LinkController.getAll);
router.delete("/links/:code", LinkController.delete);

export default router;
