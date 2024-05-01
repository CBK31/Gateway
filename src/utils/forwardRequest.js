const axios = require("axios");

function forwardRequest(serviceUrl) {
  return async (req, res, next) => {
    try {
      const response = await axios({
        method: req.method,
        url: `${serviceUrl}${req.url}`,
        data: req.body,
        headers: { ...req.headers, host: serviceUrl },
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error forwarding request:", error);
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
}

module.exports = forwardRequest;
