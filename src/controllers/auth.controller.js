import authService from "../services/auth.service.js";
import errorWrapper from "../utils/errorWrapper.js";

class AuthController {
  signup = errorWrapper(async ({ body }, res) => {
    const userData = await authService.signup(body);

    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(userData);
  });

  activate = errorWrapper(async ({ params }, res) => {
    const activationLink = params.link;

    await authService.activate(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  });

  login = () => null;
  logout = () => null;
  refresh = () => null;
}

export default new AuthController();
