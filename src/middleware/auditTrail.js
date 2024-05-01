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
    userId: req.user ? req.user.id : "Anonymous",
    userAgent: req.headers["user-agent"],
    headers: JSON.stringify(req.headers),
    params: JSON.stringify(req.params),
    body: JSON.stringify(req.body),
    result: "",
    success: true,
  };

  res.on("finish", () => {
    auditData.statusCode = res.statusCode;
    auditData.success = res.statusCode >= 200 && res.statusCode < 300;
    auditData.result = JSON.stringify(responseBody);
    console.log("AUDIT:", auditData);
  });

  next();
}

module.exports = auditTrail;
