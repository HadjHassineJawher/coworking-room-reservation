const coworkingSpaceRepository = require('../repositories/coworkingSpace.repository');
class CoworkingSpaceService {
  async createCoworkingSpace(coworkingSpaceData) {
    try {
      const coworkingSpace = await coworkingSpaceRepository.create(
        coworkingSpaceData,
      );
      return coworkingSpace;
    } catch (error) {
      throw new Error('Error creating coworking space: ' + error.message);
    }
  }

  async getCoworkingSpaceById(id) {
    try {
      const coworkingSpace = await coworkingSpaceRepository.findById(id);
      if (!coworkingSpace) {
        return null;
      }
      return coworkingSpace;
    } catch (error) {
      throw new Error('Error retrieving coworking space: ' + error.message);
    }
  }
}

module.exports = new CoworkingSpaceService();
