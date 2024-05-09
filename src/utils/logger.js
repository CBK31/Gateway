const { createLogger, format, transports } = require("winston");

const auditLogger = createLogger({
  level: "info",
  format: format.combine(
    format.printf((info) => `${JSON.stringify(info.message)}`)
  ),
  transports: [
    new transports.File({ filename: "./audit.log" }),
    new transports.Console(),
  ],
});

module.exports = { auditLogger };
