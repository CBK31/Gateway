const forwardRequest = require("../utils/forwardRequest");
const getTokenFromReq = require("..//utils/getTokenFromReq");
const axios = require("axios");

const authenticateToken = () => {
  return async (req, res, next) => {
    ////////////////////////////////////////////////////////////
    // HONE BEDDE ZABBETA LA SIR ESTA3MIL : getTokenFromReq(req); BEL IF

    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    const token = await getTokenFromReq(req);
    console.log("fetit 3al authenticate Token ");

    if (!token) {
      console.log(" exception handeling ");
      return res.status(401).json({ error: "Authentication token is missing" });
    }
    ////////////////////////////////////////////////////////
    try {
      const IDP_PATH = process.env.IDP_PATH;
      const IDP_PORT = process.env.IDP_PORT;
      const requestMethod = "POST";

      const response = await forwardRequest(
        req,
        requestMethod,
        `${IDP_PATH}${IDP_PORT}/token/verify`
      );

      if (response && response.status >= 400 && response.status < 600) {
        return res.status(response.status).json(response.data.error);
      } else {
        //req.headers.authorization = `Bearer ${response.token}`;

        const aa = await getTokenFromReq(req);

        console.log(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

MY NEW TOKEN HEADER :   ${aa}

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);

        next();
      }
    } catch (error) {
      if (error.response) {
        return res
          .status(error.response.status)
          .json({ error: error.response.data.error });
      } else {
        console.log(error);
        return res.status(500).json({ error: "Failed to verify token" });
      }
    }
  };
};

module.exports = authenticateToken;
