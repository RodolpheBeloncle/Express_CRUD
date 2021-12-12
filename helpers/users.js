const jwt = require("jsonwebtoken");
require("dotenv").config();

const PRIVATE_KEY = process.env.ACCESS_TOKEN_SECRET;

const generateAccessToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, PRIVATE_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    } else {
      req.user = user.user;
    }

    next();
  });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, PRIVATE_KEY, (err, authData) => {
      if (err) {
        return res.sendStatus(401);
      } else {
        res.status(200);
        req.data = authData.user.id;
      }
      next();
    });
  }
};

module.exports = {
  generateAccessToken,
  authenticateToken,
  verifyToken,
};
