const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const auditTrail = require("./middleware/auditTrail");

const userRoutes = require("./routes/userRoutes");
const videoProviderRoutes = require("./routes/videoProviderRoutes");

const PORT = process.env.GATEWAY_PORT;

app.use(express.json());

app.use(auditTrail);

app.use("/user", userRoutes);

app.use("/video-provider", videoProviderRoutes);

app.listen(PORT, () => {
  console.log(`Gateway service running on port ${PORT}`);
});
