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
}

module.exports = new UserRepository();
