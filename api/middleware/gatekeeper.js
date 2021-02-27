const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        res.status(401).json('Token invalid');
      } else {
        next();
      }
    });
  } else {
    res.status(401).json('No Token');
  }
};
