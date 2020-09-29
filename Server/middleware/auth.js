const jwt = require("jsonwebtoken");
const config = require("config");

function userAuth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey")); // return payload = content of token
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}

function adminAuth(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied."); // 403 = forbidden
  next();
}

exports.user = userAuth;
exports.admin = adminAuth;
