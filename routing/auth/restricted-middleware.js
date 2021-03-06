const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets.js');

// Middleware to verify that token is provided, if provided, then verify that it is valid token.

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log({ token });

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token! ' });
    }
    req.decodedJwt = decoded;
    next();
  });
};
