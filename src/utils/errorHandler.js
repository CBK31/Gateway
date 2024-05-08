class ErrorHandler {
  static handle(error, res) {
    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(status).json({ error: message });
  }
}
module.exports = ErrorHandler;
