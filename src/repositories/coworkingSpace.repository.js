const CoworkingSpace = require('../models/coworkingSpace.model');
class CoworkingSpaceRepository {
  async create(coworkingSpaceData) {
    const coworkingSpace = new CoworkingSpace(coworkingSpaceData);
    return await coworkingSpace.save();
  }

  async findById(id) {
    return await CoworkingSpace.findById(id);
  }
}

module.exports = new CoworkingSpaceRepository();
