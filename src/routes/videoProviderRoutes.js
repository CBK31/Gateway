const express = require("express");
const Router = express.Router();
const redirectRequest = require("../middleware/redirectRequest");
const authentication = require("../middleware/authentication");
const dotenv = require("dotenv");
dotenv.config();

Router.get("/available", redirectRequest);

Router.get("/play/:id", authentication(), redirectRequest);

Router.post("/addcomment", authentication(), redirectRequest);

Router.put("/updatecomment", authentication(), redirectRequest);

Router.post("/replycomment", authentication(), redirectRequest);

Router.post("/getallcomment", authentication(), redirectRequest);

Router.post("/addrating", authentication(), redirectRequest);

module.exports = Router;
