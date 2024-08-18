const mongoose = require('mongoose');

const coworkingSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      max: 1000,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[A-Z0-9]{6,12}$/,
    },
    operatingHours: {
      type: String,
      required: true,
      match:
        /^(Monday - Friday \d{2}:\d{2} - \d{2}:\d{2}|Monday - Sunday \d{2}:\d{2} - \d{2}:\d{2})$/,
    },
    contactInfo: {
      phone: {
        type: String,
        trim: true,
        match: /^\+?[1-9]\d{1,14}$/,
      },
      email: {
        type: String,
        trim: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('CoworkingSpace', coworkingSpaceSchema);
