const forwardRequest = require("../utils/forwardRequest");
const axios = require("axios");
const { error } = require("console");
const { inspect } = require("util");
//import { inspect } from "util";
const authenticateToken = () => {
  return async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("fetit 3al authenticate Token ");

    if (!token) {
      console.log(" exception handeling ");
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const IDP_PATH = process.env.IDP_PATH;
      const IDP_PORT = process.env.IDP_PORT;
      req.customUrl = "/token/verify";
      const requestMethod = "POST";
      const response = await forwardRequest(
        req,
        requestMethod,
        `${IDP_PATH}${IDP_PORT}`
      );

      // const response = await axios.post(
      //   "http://localhost:3001/",
      //   {},
      //   {
      //     headers: {
      //       Authorization: token,
      //     },
      //   }
      // );
      //console.log()
      //  res.userInfo = response.userInfo; ///// elo 3aze ?/////////////
      if (response) {
        return res.status(response.status).json(response.data);
      } else {
        console.log(error);
        return res
          .status(400)
          .json({ error: "error handeling : bad request aa" });
      }
    } catch (error) {
      if (error.response) {
        return res
          .status(error.response.status)
          .json({ error: error.response.data.error });
      } else {
        //  console.log(error);
        return res.status(500).json({ error: "Failed to verify token" });
      }
    }
  };
};

module.exports = authenticateToken;
