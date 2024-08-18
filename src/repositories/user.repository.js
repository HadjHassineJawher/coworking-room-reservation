const User = require('../models/user.model');
const CoworkingSpace = require('../models/coworkingSpace.model');
class UserRepository {
  async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async joinCoworkingSpace(userId, coworkingSpaceId, code) {
    try {
      const coworkingSpace = await CoworkingSpace.findById(coworkingSpaceId);
      if (!coworkingSpace) {
        throw new Error('Coworking space not found');
      }

      if (coworkingSpace.type === 'Private' && coworkingSpace.code !== code) {
        throw new Error('Invalid code for private coworking space');
      }

      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      if (
        user.coworkingSpaces.some(
          (cs) =>
            cs.coworkingSpaceId &&
            cs.coworkingSpaceId.toString() === coworkingSpaceId.toString(),
        )
      ) {
        throw new Error('User is already a member of this coworking space');
      }

      user.coworkingSpaces.push({ coworkingSpaceId, joinedAt: new Date() });
      return await user.save();
    } catch (error) {
      throw new Error('Error joining coworking space: ' + error.message);
    }
  }

  async getUserCoworkingSpaces(userId) {
    try {
      const user = await User.findById(userId).populate(
        'coworkingSpaces.coworkingSpaceId',
      );
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
}

module.exports = new UserRepository();
