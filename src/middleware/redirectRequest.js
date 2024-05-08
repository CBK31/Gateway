const forwardRequest = require("../utils/forwardRequest");
const { error } = require("console");
const { ErrorMessages } = require("../utils/exceptions");
const { CustomError } = require("../utils/exceptions");
const ErrorHandler = require("../utils/errorHandler");
// const { inspect } = require("util");

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
      console.log(error);
      ErrorHandler.handle(ErrorMessages.serviceUnavailable, res);
    }
  } catch (error) {
    if (error.response) {
      //  return res.status(error.response.status).json(error.response.data);
      ErrorHandler.handle(
        new CustomError(error.response.status, error.response.data),
        res
      );
    } else {
      ErrorHandler.handle(
        new CustomError(error.status, error.data || error.message),
        res
      );
      // return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = redirectRequest;
