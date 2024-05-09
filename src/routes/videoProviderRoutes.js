const express = require("express");
const Router = express.Router();
const redirectRequest = require("../middleware/redirectRequest");
const authentication = require("../middleware/authentication");
const dotenv = require("dotenv");
dotenv.config();

Router.get("/available", redirectRequest);

Router.get("/play/:id", authentication(), redirectRequest);

Router.post("/addcomment/:id", authentication(), redirectRequest);

Router.put("/updatecomment/:id", authentication(), redirectRequest);

Router.post("/replycomment/:id", authentication(), redirectRequest);

Router.post("/getallcomments/:id", authentication(), redirectRequest);

Router.post("/addrating/:id", authentication(), redirectRequest);

module.exports = Router;
