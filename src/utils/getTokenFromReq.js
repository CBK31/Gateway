const getTokenFromReq = async (req) => {
  try {
    return req.headers.authorization?.split(" ")[1];
  } catch (error) {
    return undefined;
  }
};
module.exports = getTokenFromReq;
