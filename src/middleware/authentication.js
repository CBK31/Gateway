const forwardRequest = require("../utils/forwardRequest");
const getTokenFromReq = require("..//utils/getTokenFromReq");
const { ErrorMessages } = require("../utils/exceptions");
const { CustomError } = require("../utils/exceptions");
const ErrorHandler = require("../utils/errorHandler");

const authenticateToken = () => {
  return async (req, res, next) => {
    const token = await getTokenFromReq(req);
    if (!token) {
      ErrorHandler.handle(ErrorMessages.noAuthTokenProvided, res);
    }

    try {
      const IDP_PATH = process.env.IDP_PATH;
      const IDP_PORT = process.env.IDP_PORT;
      const requestMethod = "POST";

      const response = await forwardRequest(
        req,
        requestMethod,
        `${IDP_PATH}${IDP_PORT}/token/verify`
      );

      if (response && response.status >= 400 && response.status < 600) {
        ErrorHandler.handle(
          new CustomError(
            response.data.error || response.data.message,
            response.status
          ),
          res
        );
      } else {
        // I wasn't sure if the new token should replace the old one, go to the front, or do both
        if (response.data && response.data.token) {
          req.headers.authorization = `Bearer ${response.data.token}`;
          if (req.originalUrl === "/user/token/verify") {
            res.status(200).json({ token: response.data.token });
          }
        }
        next();
      }
    } catch (error) {
      // ErrorHandler.handle(
      //   new CustomError(
      //     error.message || "internal server error - authentication service",
      //     error.status
      //   ),
      //   res
      // );
    }
  };
};

module.exports = authenticateToken;
