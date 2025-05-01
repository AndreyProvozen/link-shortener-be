import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_EXPIRATION_MS, REFRESH_TOKEN_KEY } from "../constants/global.js";
import authService from "../services/auth.service.js";
import CustomError from "../utils/customError.js";
import errorWrapper from "../utils/errorWrapper.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

class AuthController {
  setRefreshToken = (res, refreshToken) => {
    res.cookie(REFRESH_TOKEN_KEY, refreshToken, { maxAge: REFRESH_TOKEN_EXPIRATION_MS, httpOnly: true });
  };

  signup = errorWrapper(async (req, res, next) => {
    handleValidationErrors(req, next);

    await authService.signup(req.body);

    res.sendStatus(204);
  });

  activate = errorWrapper(async (req, res, next) => {
    handleValidationErrors(req, next);

    await authService.activate(req.params.link);

    res.redirect(`${process.env.CLIENT_URL}/activation/success`);
  });

  login = errorWrapper(async (req, res, next) => {
    handleValidationErrors(req, next);

    const userData = await authService.login(req.body);

    this.setRefreshToken(res, userData.refreshToken);
    res.json(userData);
  });

  logout = errorWrapper(async (req, res) => {
    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];
    if (!refreshToken) throw CustomError.UnauthorizedError();

    await authService.logout(refreshToken);

    res.clearCookie(REFRESH_TOKEN_KEY);
    res.clearCookie(ACCESS_TOKEN_KEY);
    res.json({ message: "User logged out" });
  });

  refresh = errorWrapper(async (req, res) => {
    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];

    if (!refreshToken) throw CustomError.UnauthorizedError();

    const userData = await authService.refresh(refreshToken);

    this.setRefreshToken(res, userData.refreshToken);
    res.json(userData);
  });

  check = errorWrapper(async (req, res) => {
    const user = await authService.check(req?.user?.id);
    res.json({ user });
  });
}

export default new AuthController();
