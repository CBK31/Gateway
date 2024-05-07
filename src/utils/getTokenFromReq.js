const getTokenFromReq = async (req) => {
  try {
    return req.headers.authorization?.split(" ")[1];
  } catch (error) {
    // console.log("ERROR FROM THE getTokenFromReq " + error);
    return undefined;
  }
};
module.exports = getTokenFromReq;
