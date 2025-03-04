import Router from "express";
import authController from "../controllers/auth.controller.js";
import { body, param } from "express-validator";
import { NANO_ID_REGEXP } from "../constants/regexp.js";

const router = new Router();

router.post("/signup", body("email").isEmail(), body("password").isLength({ min: 3, max: 32 }), authController.signup);
router.post("/login", body("email").isEmail(), body("password").isLength({ min: 3, max: 32 }), authController.login);
router.post("/logout", authController.logout);
router.get("/activate/:link", param("link").matches(NANO_ID_REGEXP), authController.activate);
router.get("/refresh", authController.refresh);

export default router;
