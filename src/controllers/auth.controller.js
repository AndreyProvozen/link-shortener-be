import authService from "../services/auth.service.js";
import CustomError from "../utils/customError.js";
import errorWrapper from "../utils/errorWrapper.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

class AuthController {
  setRefreshToken = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
  };

  signup = errorWrapper(async (req, res, next) => {
    handleValidationErrors(req, next);

    const userData = await authService.signup(req.body);

    this.setRefreshToken(res, userData.refreshToken);
    res.json(userData);
  });

  activate = errorWrapper(async (req, res, next) => {
    handleValidationErrors(req, next);

    await authService.activate(req.params.link);

    res.redirect(process.env.CLIENT_URL);
  });

  login = errorWrapper(async (req, res, next) => {
    handleValidationErrors(req, next);

    const userData = await authService.login(req.body);

    this.setRefreshToken(res, userData.refreshToken);
    res.json(userData);
  });

  logout = errorWrapper(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw CustomError.UnauthorizedError();

    await authService.logout(refreshToken);

    res.clearCookie("refreshToken");
    res.json({ message: "User logged out" });
  });

  refresh = errorWrapper(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw CustomError.UnauthorizedError();

    const userData = await authService.refresh(req.cookies.refreshToken);

    this.setRefreshToken(res, userData.refreshToken);
    res.json(userData);
  });
}

export default new AuthController();
