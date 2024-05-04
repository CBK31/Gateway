const axios = require("axios");

const forwardRequest = async (req, requestMethod, serviceUrl) => {
  // return async (req, res) => {
  try {
    const response = await axios({
      //requestMethod | req.method,
      method: "POST",
      // url: `${serviceUrl}${req.url}`,
      url: `${serviceUrl}${req.customUrl}`,
      data: req.body,
      headers: { ...req.headers, host: serviceUrl },
    });
    //----------------------------------------------------------------

    // const response = await axios.post(`${serviceUrl}${req.url}`, req.body, {
    //   headers: {
    //     Authorization: token,
    //   },
    // });
    //---------------------------------------------------------
    // const response = await axios.post(
    //   "http://localhost:3001/",
    //   {},
    //   {
    //     headers: {
    //       Authorization: token,
    //     },
    //   }
    // );
    console.log("response status 2 : " + response.status);
    return response;
    //return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding request:", error.message);
    // if (!res.headersSent) {
    //   console.log("my response : " + res.message);
    //   res.status(500).json({ message: "Internal Server Error" });
    // }
  }
  //};
};

module.exports = forwardRequest;
