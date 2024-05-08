const { verify } = require("jsonwebtoken");

const getPayloadFromToken = async (token) => {
  try {
    return verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return undefined;
  }
};
module.exports = getPayloadFromToken;
