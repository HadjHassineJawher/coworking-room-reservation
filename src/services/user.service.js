const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');

class UserService {
  async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error('Error hashing password: ' + error.message);
    }
  }

  async createUser(userData) {
    try {
      const hashedPassword = await this.hashPassword(userData.password);

      const user = await userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      const userObject = user.toObject();
      delete userObject.password;

      return userObject;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async joinCoworkingSpace(userId, coworkingSpaceId, code) {
    try {
      return await userRepository.joinCoworkingSpace(
        userId,
        coworkingSpaceId,
        code,
      );
    } catch (error) {
      throw new Error('Error joining coworking space: ' + error.message);
    }
  }

  async getUserCoworkingSpaces(userId) {
    try {
      return await userRepository.getUserCoworkingSpaces(userId);
    } catch (error) {
      throw new Error(
        'Error retrieving user coworking spaces: ' + error.message,
      );
    }
  }
}

module.exports = new UserService();
