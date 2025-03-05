import tokenService from "../services/token.service.js";
import CustomError from "../utils/customError.js";

const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next(CustomError.UnauthorizedError());

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) return next(CustomError.UnauthorizedError());

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) return next(CustomError.UnauthorizedError());

    req.user = userData;
    next();
  } catch (error) {
    return next(CustomError.UnauthorizedError());
  }
};

export default authMiddleware;
