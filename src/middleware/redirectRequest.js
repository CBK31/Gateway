const forwardRequest = require("../utils/forwardRequest");
const axios = require("axios");
const { error } = require("console");
const { inspect } = require("util");

const getServiceUrl = (req) => {
  const basePath = req.originalUrl.split("/")[1];

  // console.log("=============== my based path : " + basePath);

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
  // console.log("ana bi aleb el redirect request ");
  if (!serviceUrl) {
    //  console.log(inspect(req));
    return res.status(404).json({ error: "error handeling Service not found" });
  }

  try {
    const response = await forwardRequest(
      req,
      req.method,
      `${serviceUrl}${req.originalUrl}`
    );

    if (response) {
      // console.log(`

      // my response is  from the redirect message : ${inspect(response)}

      // `);
      return res.status(response.status).send(response.data);
    } else {
      console.log(error);
      return res.status(500).json({ error: "No response from service" });
    }
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = redirectRequest;
