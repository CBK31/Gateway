const express = require("express");
const dotenv = require("dotenv");
const app = express();
const auditTrail = require("./middleware/auditTrail");
dotenv.config();
const PORT = process.env.GATEWAY_PORT;
const RoutesIndex = require("./routes/index");

app.use(express.json());

app.use(auditTrail);

app.use("/", RoutesIndex);

app.listen(PORT, () => {
  console.log(`Gateway service running on port ${PORT}`);
});
