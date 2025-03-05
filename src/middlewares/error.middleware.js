import CustomError from "../utils/customError.js";

const errorMiddleware = (error, req, res, next) => {
  console.log(error);

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ message: error.message, errors: error.errors });
  }

  return res.status(500).json({ message: "Something went wrong" });
};

export default errorMiddleware;
