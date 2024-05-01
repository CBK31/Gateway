// auditTrail.js
function auditTrail(req, res, next) {
  const auditData = {
    timestamp: new Date(),
    microservice: "", // To be dynamically determined based on the request path
    url: req.originalUrl,
    method: req.method,
    statusCode: res.statusCode, // This should be captured after response
    userId: req.user ? req.user.id : "Anonymous", // Set after authentication
    userAgent: req.headers["user-agent"],
    success: true, // Default to true, adjust based on response
  };

  console.log("AUDIT:", auditData); // Replace with proper logging before production
  next();
}

module.exports = auditTrail;
