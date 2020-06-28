//verify token
module.exports = function authenticateUserToken(req, res, next) {
  //get auth token
  const bearertoken = req.headers["authorization"];

  if (bearertoken !== (null || undefined || "")) {
    const token = bearertoken.replace("Bearer ", "");
    req.token = token;
    next();
  } else {
    res.status(401).send("Please Login to Access this Resource");
  }
};
