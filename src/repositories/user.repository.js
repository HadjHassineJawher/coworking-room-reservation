const User = require('../models/user.model');

class UserRepository {
  async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error('Error creating user', error);
    }
  }
}

module.exports = new UserRepository();
