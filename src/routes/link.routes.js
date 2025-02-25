import Router from "express";
import LinkController from "../controllers/link.controller.js";

const router = new Router();

router.post("/links", LinkController.create);
router.get("/links", LinkController.getAll);
router.get("/links/:id", LinkController.getOne);
router.put("/links", LinkController.update);
router.delete("/links/:id", LinkController.delete);

export default router;
