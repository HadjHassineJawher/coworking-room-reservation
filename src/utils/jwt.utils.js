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
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    }

    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }

    throw new Error('Token verification failed');
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Token expired') {
      return res.status(401).json({ message: 'Token expired' });
    }

    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  authenticateToken,
};
