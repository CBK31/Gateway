const getTokenFromReq = require("../utils/getTokenFromReq");
const getPayloadFromToken = require("../utils/getPayloadFromToken");
const serviceMap = {
  "/token": "IDP",
  "/user": "IDP",
  "/video-provider": "Video Provider",
};

function auditTrail(req, res, next) {
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
    userId: "Unknown",
    userAgent: req.headers["user-agent"],
    headers: req.headers,
    queryParams: req.query,
    requestBody: req.body,
    result: {},
    success: true,
  };

  res.on("finish", async () => {
    auditData.statusCode = res.statusCode;
    auditData.success = res.statusCode >= 200 && res.statusCode < 300;

    try {
      const resBodyParsed = jsonParser(responseBody);

      auditData.result =
        resBodyParsed.message ||
        resBodyParsed.error ||
        resBodyParsed ||
        responseBody;

      let token = await getTokenFromReq(req);
      let payload = await getPayloadFromToken(token);
      if (!payload) {
        token = resBodyParsed.token;
        payload = await getPayloadFromToken(token);
      }
      auditData.userId = payload._id || "Unknown";
    } catch (error) {}
  });

  function jsonParser(obj) {
    try {
      return JSON.parse(obj);
    } catch (error) {
      return undefined;
    }
  }
  next();
}

module.exports = auditTrail;
//Params: req.params,
