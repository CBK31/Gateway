const express = require("express");
const Routes = express.Router();
const forwardRequest = require("../utils/forwardRequest");
const authentication = require("../middleware/authentication");
const dotenv = require("dotenv");
dotenv.config();

const IDP_PATH = process.env.IDP_PATH;
const IDP_PORT = process.env.IDP_PORT;

const V_P_PATH = process.env.VIDEO_PROVIDER_PATH;
const V_P_PORT = process.env.VIDEO_PROVIDER_PORT;

Routes.use("/", authentication());

module.exports = Routes;
