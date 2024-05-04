const { inspect } = require("util");
const serviceMap = {
  "/signup": "IDP Microservice",
  "/signin": "IDP Microservice",
};

function auditTrail(req, res, next) {
  const originalSend = res.send;
  let responseBody = {};

  res.send = function (data) {
    responseBody = data;
    originalSend.call(this, data);
  };

  const microservice =
    Object.keys(serviceMap).find((key) => req.path.startsWith(key)) ||
    "Unknown";

  const auditData = {
    timestamp: new Date(),
    microservice: serviceMap[microservice],
    url: req.originalUrl,
    method: req.method,
    statusCode: null,
    userId: "Anonymous",
    userAgent: req.headers["user-agent"],
    headers: req.headers,
    params: req.params,
    query: req.query,
    requestBody: req.body,
    result: "",
    success: true,
  };

  res.on("finish", () => {
    const resBodyParsed = JSON.parse(responseBody);
    auditData.statusCode = res.statusCode;
    auditData.success = res.statusCode >= 200 && res.statusCode < 300;
    auditData.result = resBodyParsed;
    auditData.userId = resBodyParsed.userId
      ? resBodyParsed.userId
      : "Anonymous";
    console.log("AUDIT:", auditData);
  });

  next();
}

module.exports = auditTrail;
