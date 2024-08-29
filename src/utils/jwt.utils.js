const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/env.config');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, jwt_secret, {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, jwt_secret, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwt_secret);
  } catch (error) {
    throw new Error('Invalid token', error);
  }
};

module.exports = { generateToken, generateRefreshToken, verifyToken };
