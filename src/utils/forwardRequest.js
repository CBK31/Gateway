const axios = require("axios");

const forwardRequest = async (req, requestMethod, serviceUrl) => {
  try {
    // const { host, ...restHeaders } = req.headers;

    // if (req.userId) {
    //   headers["X-User-Id"] = req.userId;
    // }

    const response = await axios({
      method: requestMethod,
      url: `${serviceUrl}`,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers["authorization"],
      },
    });

    return response;
    //return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("error handeling : Error forwarding request:", error.message);
  }
};

module.exports = forwardRequest;

// headers: {
//   "Content-Type": "application/json",
//   Authorization: req.headers["authorization"],
// },
// headers: { ...req.headers, host: serviceUrl },
//  headers: req.restHeaders,
//  timeout: 5000,
//headers: { ...req.headers },
//url: `${serviceUrl}`,
// url: `${serviceUrl}$
//requestMethod | req.method,{req.url}`,

// if (req.url.includes("/token/verify") && response.data.userId) {
//   req.userId = response.data.userId; // Pass userId to next middleware
// }
