function isValidJSON(obj) {
  try {
    JSON.parse(obj);
    return true;
  } catch (error) {
    return false;
  }
}
module.exports = { isValidJSON };
