const { isValidJSON } = require("../utils/checkJsonValidity");

const serviceMap = {
  "/user": "IDP Microservice",
  // "/user/signin": "IDP Microservice",
};

function auditTrail(req, res, next) {
  console.log("3am bfout 3al audit BEL RAW7A ");
  const originalSend = res.send;
  let responseBody = {};

  res.send = function (data) {
    responseBody = data;
    originalSend.call(this, data);
  };

  const microservice =
    serviceMap[
      Object.keys(serviceMap).find((key) => req.path.startsWith(key))
    ] || "Unknown";

  const auditData = {
    timestamp: new Date(),
    microservice,
    url: req.originalUrl,
    method: req.method,
    statusCode: null,
    userId: req.userId || "Unknown",
    userAgent: req.headers["user-agent"],
    headers: req.headers,
    params: req.params,
    query: req.query,
    requestBody: req.body,
    result: {},
    success: true,
  };

  res.on("finish", () => {
    console.log("3am bfout 3al audit BEL RAJ3A " + responseBody);
    auditData.statusCode = res.statusCode;
    auditData.success = res.statusCode >= 200 && res.statusCode < 300;
    if (isValidJSON(responseBody)) {
      const resBodyParsed = JSON.parse(responseBody);
      auditData.result = resBodyParsed;
      auditData.userId = resBodyParsed.userId || "Anonymous";
    }
    console.log("AUDIT:", auditData);
  });

  next();
}

module.exports = auditTrail;
//module.exports = { isValidJSON };
//module.exports = setUserId();
// if (req.originalUrl.includes("/token/verify") || resBodyParsed.userId) {
//   auditData.userId = resBodyParsed.userId || "Anonymous";
// }
