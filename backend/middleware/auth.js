const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // User token needs to be provided as part of the request header.
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid." });
  }
}

module.exports = auth;
