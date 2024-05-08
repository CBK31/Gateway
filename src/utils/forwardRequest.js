const axios = require("axios");

const forwardRequest = async (req, requestMethod, serviceUrl) => {
  try {
    const response = await axios({
      method: requestMethod,
      url: `${serviceUrl}`,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers["authorization"],
      },
      timeout: 5000,
    });

    return response;
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      return {
        status: 500,
        data: {
          message: "Internal Server Error - Unable to contact the service",
        },
      };
    }
  }
};

module.exports = forwardRequest;
