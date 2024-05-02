const forwardRequest = require("../utils/forwardRequest");

const authenticateToken = () => {
  return async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("fetit 3al authenticateToken ");
    if (!token) {
      console.log(" exception handeling ");
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const IDP_PATH = process.env.IDP_PATH;
      const IDP_PORT = process.env.IDP_PORT;
      console.log("path : " + IDP_PATH + " port : " + IDP_PORT);
      const response = forwardRequest(`${IDP_PATH}${IDP_PORT}`);

      //   const response = await axios.post(
      //     "http://localhost:3001",
      //     {},
      //     {
      //       headers: {
      //         Authorization: token,
      //       },
      //     }
      //   );

      //  req.user.id = response.data.id;

      next();
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

// const authenticateToken = () => {
//   console.log("3am tousa 3al auth : ");
//   return async (req, res, next) => {
//     console.log("fetit 3al sync");
//     next();
//   };
// };

module.exports = authenticateToken;
