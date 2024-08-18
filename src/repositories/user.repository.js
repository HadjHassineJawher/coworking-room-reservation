const User = require('../models/user.model');
class UserRepository {
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findById(userId) {
    return await User.findById(userId);
  }

  async addCoworkingSpace(user, coworkingSpaceData) {
    user.coworkingSpaces.push(coworkingSpaceData);
    return await user.save();
  }

  async getUserWithCoworkingSpaces(userId) {
    return await User.findById(userId).populate(
      'coworkingSpaces.coworkingSpaceId',
    );
  }
}

module.exports = new UserRepository();
