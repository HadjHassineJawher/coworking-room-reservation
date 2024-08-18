const CoworkingSpace = require('../models/coworkingSpace.model');
class CoworkingSpaceRepository {
  async create(coworkingSpaceData) {
    try {
      const coworkingSpace = new CoworkingSpace(coworkingSpaceData);
      return await coworkingSpace.save();
    } catch (error) {
      throw new Error('Error creating coworking space: ' + error.message);
    }
  }
}

module.exports = new CoworkingSpaceRepository();
