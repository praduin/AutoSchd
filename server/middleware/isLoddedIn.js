const jwt = require("jsonwebtoken");
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  next();
}

module.exports = isLoggedIn;
