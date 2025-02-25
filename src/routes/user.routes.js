import Router from "express";
import UserController from "../controllers/user.controller.js";

const router = new Router();

router.post("/user", UserController.create);

export default router;
