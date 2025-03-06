import Router from "express";
import authController from "../controllers/auth.controller.js";
import { body, param } from "express-validator";
import { NANO_ID_REGEXP } from "../constants/regexp.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = new Router();

const validateCredentials = [body("email").isEmail(), body("password").isLength({ min: 3, max: 32 })];

router.post("/signup", validateCredentials, authController.signup);
router.post("/login", validateCredentials, authController.login);
router.post("/logout", authController.logout);
router.get("/activate/:link", param("link").matches(NANO_ID_REGEXP), authController.activate);
router.get("/refresh", authMiddleware, authController.refresh);

export default router;
