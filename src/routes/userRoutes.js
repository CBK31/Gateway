const express = require("express");
const Routes = express.Router();
const forwardRequest = require("../utils/forwardRequest");
const authentication = require("../middleware/authentication");
const dotenv = require("dotenv");
dotenv.config();

const IDP_PATH = process.env.IDP_PATH;
const IDP_PORT = process.env.IDP_PORT;

Routes.use(
  "/verify-token",
  authentication()
  //forwardRequest(`${IDP_PATH}${IDP_PORT}`)
);

module.exports = Routes;
