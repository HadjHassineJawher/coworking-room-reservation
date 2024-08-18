const mongoose = require('mongoose');
const config = require('./env.config.js');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri, {});
    console.log('MongoDB connected successfully ... 🚀');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
