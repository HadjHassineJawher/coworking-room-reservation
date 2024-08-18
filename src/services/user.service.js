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
}

module.exports = new UserService();
