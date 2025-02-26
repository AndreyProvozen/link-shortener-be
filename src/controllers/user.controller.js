import UserService from "../services/user.service.js";
import errorWrapper from "../utils/errorWrapper.js";

class UserController {
  create = errorWrapper(async ({ body }, res) => {
    const user = await UserService.create(body);
    res.status(201).json(user);
  });
}

export default new UserController();
