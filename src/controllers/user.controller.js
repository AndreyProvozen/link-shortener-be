import userService from "../services/user.service.js";
import errorWrapper from "../utils/errorWrapper.js";

class UserController {
  create = errorWrapper(async (req, res) => {
    const userData = req.body;

    const user = await userService.create(userData);
    res.json(user);
  });
}

export default new UserController();
