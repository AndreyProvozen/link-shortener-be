import { validationResult } from "express-validator";
import authService from "../services/auth.service.js";
import errorWrapper from "../utils/errorWrapper.js";
import CustomError from "../utils/customError.js";

class AuthController {
  signup = errorWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(CustomError.BadRequest("Validation error", errors.array()));
    }

    const userData = await authService.signup(req.body);

    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(userData);
  });

  activate = errorWrapper(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(CustomError.BadRequest("Validation error", errors.array()));
    }

    await authService.activate(req.params.link);
    return res.redirect(process.env.CLIENT_URL);
  });

  login = errorWrapper(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(CustomError.BadRequest("Validation error", errors.array()));
    }

    const userData = await authService.login(req.body);

    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(userData);
  });

  logout = errorWrapper(async (req, res) => {
    const token = await authService.logout(req.cookies.refreshToken);
    res.clearCookie("refreshToken");

    res.json(token);
  });

  refresh = errorWrapper(async (req, res) => {
    const userData = await authService.refresh(req.cookies.refreshToken);
    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    res.json(userData);
  });
}

export default new AuthController();
