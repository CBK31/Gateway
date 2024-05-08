const express = require("express");
const Routes = express.Router();
const authentication = require("../middleware/authentication");
const redirectRequest = require("../middleware/redirectRequest");
const dotenv = require("dotenv");
dotenv.config();

Routes.post("/signup", redirectRequest);

Routes.post("/signin", redirectRequest);

Routes.get("/token/verify", authentication());

Routes.get("/profile/view", authentication(), redirectRequest);

Routes.patch("/profile/edit", authentication(), redirectRequest);

module.exports = Routes;
