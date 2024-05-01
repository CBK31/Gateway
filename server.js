const express = require("express");
const dotenv = require("dotenv");
const app = express();
const auditTrail = require("./middleware/auditTrail");
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());

app.use(auditTrail);

app.get("/", (req, res) => {
  res.send("Gateway is running");
});

app.listen(PORT, () => {
  console.log(`Gateway service running on port ${PORT}`);
});
