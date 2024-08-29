const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');
const CoworkingSpace = require('../models/coworkingSpace.model');
const { generateToken } = require('../utils/jwt.utils');

class UserService {
  async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error('Error hashing password: ' + error.message);
    }
  }

  async comparePassword(providedPassword, storedPassword) {
    try {
      return await bcrypt.compare(providedPassword, storedPassword);
    } catch (error) {
      throw new Error('Error comparing passwords: ' + error.message);
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
      const user = await userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const coworkingSpace = await CoworkingSpace.findById(coworkingSpaceId);
      if (!coworkingSpace) {
        throw new Error('Coworking space not found');
      }

      if (coworkingSpace.type === 'Private' && coworkingSpace.code !== code) {
        throw new Error('Invalid code for private coworking space');
      }

      if (this.isUserAlreadyMember(user, coworkingSpaceId)) {
        throw new Error('User is already a member of this coworking space');
      }

      return await userRepository.joinCoworkingSpace(user, {
        coworkingSpaceId,
        joinedAt: new Date(),
      });
    } catch (error) {
      throw new Error('Error joining coworking space: ' + error.message);
    }
  }

  async getUserCoworkingSpaces(userId) {
    try {
      const user = await userRepository.getUserCoworkingSpaces(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user.coworkingSpaces;
    } catch (error) {
      throw new Error(
        'Error retrieving user coworking spaces: ' + error.message,
      );
    }
  }

  isUserAlreadyMember(user, coworkingSpaceId) {
    return user.coworkingSpaces.some(
      (cs) =>
        cs.coworkingSpaceId &&
        cs.coworkingSpaceId.toString() === coworkingSpaceId.toString(),
    );
  }

  async updateUser(userId, userData) {
    try {
      const updatedUser = await userRepository.updateUser(userId, userData);
      if (!updatedUser) {
        throw new Error('User not found');
      }
      const userObject = updatedUser.toObject();
      delete userObject.password;
      return userObject;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  async authenticateUser(email, password) {
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await this.comparePassword(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const userObject = user.toObject();
      delete userObject.password;

      const token = generateToken(userObject);
      return { user: userObject, token };
    } catch (error) {
      throw new Error('Authentication error: ' + error.message);
    }
  }
}

module.exports = new UserService();
