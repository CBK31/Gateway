class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

const ErrorMessages = {
  serviceUnavailable: new CustomError("Service is currently unavailable", 500),
  serviceNotFound: new CustomError("Service not found", 401),
  noAuthTokenProvided: new CustomError("No authentication token provided", 401),
};

module.exports = { CustomError, ErrorMessages };
