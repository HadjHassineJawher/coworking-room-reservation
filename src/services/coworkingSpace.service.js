const coworkingSpaceRepository = require('../repositories/coworkingSpace.repository');

class CoworkingSpaceService {
  async createCoworkingSpace(coworkingSpaceData) {
    try {
      return await coworkingSpaceRepository.create(coworkingSpaceData);
    } catch (error) {
      throw new Error('Error creating coworking space: ' + error.message);
    }
  }
}

module.exports = new CoworkingSpaceService();
