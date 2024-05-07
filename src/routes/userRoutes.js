const express = require("express");
const Routes = express.Router();
//const forwardRequest = require("../utils/forwardRequest");
const authentication = require("../middleware/authentication");
const redirectRequest = require("../middleware/redirectRequest");
const dotenv = require("dotenv");
dotenv.config();

const IDP_PATH = process.env.IDP_PATH;
const IDP_PORT = process.env.IDP_PORT;

Routes.post("/signup", redirectRequest);

Routes.post("/signin", redirectRequest);

Routes.get("/profile/view", authentication(), redirectRequest);

Routes.patch("/profile/edit", authentication(), redirectRequest);

module.exports = Routes;

// //authentication(),
// (req, res, next) => {
//   console.log("5allas mnel auth w feyit 3al redirect request  ");
//   //res.status(200).json("oke");
//   next();
// },
