const express = require("express");
const myRoutes = express.Router();
const forwardRequest = require("../utils/forwardRequest");

myRoutes.use("/signup", forwardRequest("http://localhost:3001"));

module.exports = myRoutes;
