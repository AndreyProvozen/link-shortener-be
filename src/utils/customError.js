class CustomError extends Error {
  statusCode;
  errors;

  constructor(statusCode, message, errors = []) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
  }

  static UnauthorizedError(message) {
    return new CustomError(401, message);
  }

  static BadRequest(message, errors = []) {
    return new CustomError(400, message, errors);
  }

  static NotFound(message) {
    return new CustomError(404, message);
  }

  static Conflict(message) {
    return new CustomError(409, message);
  }
}

export default CustomError;
