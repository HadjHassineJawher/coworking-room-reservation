const User = require('../models/user.model');
class UserRepository {
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findById(userId) {
    return await User.findById(userId);
  }

  async joinCoworkingSpace(user, coworkingSpaceData) {
    user.coworkingSpaces.push(coworkingSpaceData);
    return await user.save();
  }

  async getUserCoworkingSpaces(userId) {
    return await User.findById(userId).populate(
      'coworkingSpaces.coworkingSpaceId',
    );
  }

  async updateUser(userId, userData) {
    return await User.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }
}

module.exports = new UserRepository();
