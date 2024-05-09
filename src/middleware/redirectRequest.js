const forwardRequest = require("../utils/forwardRequest");
const { ErrorMessages } = require("../utils/exceptions");
const { CustomError } = require("../utils/exceptions");
const ErrorHandler = require("../utils/errorHandler");

const getServiceUrl = (req) => {
  const basePath = req.originalUrl.split("/")[1];

  switch (basePath) {
    case "user":
      return `${process.env.IDP_PATH}${process.env.IDP_PORT}`;

    case "video-provider":
      return `${process.env.VIDEO_PROVIDER_PATH}${process.env.VIDEO_PROVIDER_PORT}`;
    default:
      return null;
  }
};

const redirectRequest = async (req, res) => {
  const serviceUrl = getServiceUrl(req);
  if (!serviceUrl) {
    ErrorHandler.handle(ErrorMessages.serviceNotFound, res);
  }

  try {
    const response = await forwardRequest(
      req,
      req.method,
      `${serviceUrl}${req.originalUrl}`
    );

    if (response) {
      return res.status(response.status).send(response.data);
    } else {
      ErrorHandler.handle(ErrorMessages.serviceUnavailable, res);
    }
  } catch (error) {
    if (error.response) {
      ErrorHandler.handle(
        new CustomError(error.response.status, error.response.data),
        res
      );
    } else {
      ErrorHandler.handle(
        new CustomError(error.status, error.data || error.message),
        res
      );
    }
  }
};

module.exports = redirectRequest;
