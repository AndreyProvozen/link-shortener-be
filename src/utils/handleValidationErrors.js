import { validationResult } from "express-validator";
import CustomError from "./customError.js";

const handleValidationErrors = (req, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(CustomError.BadRequest("Validation error", errors.array()));
  }
};

export default handleValidationErrors;
