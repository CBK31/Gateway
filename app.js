const express = require("express");
const dotenv = require("dotenv");
const app = express();
const auditTrail = require("./src/middleware/auditTrail");
dotenv.config();
const PORT = process.env.PORT;
const IndexRoutes = require("./src/routes/index");

app.use(express.json());

app.use(auditTrail);

app.use("/", IndexRoutes);

app.listen(PORT, () => {
  console.log(`Gateway service running on port ${PORT}`);
});
