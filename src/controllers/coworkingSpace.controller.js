const coworkingSpaceService = require('../services/coworkingSpace.service');
class CoworkingSpaceController {
  async create(req, res) {
    try {
      const coworkingSpaceData = req.body;
      const coworkingSpace = await coworkingSpaceService.createCoworkingSpace(
        coworkingSpaceData,
      );
      res.status(201).json({
        message: 'Coworking Space created successfully',
        coworkingSpace,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.coworkingSpaceId;
      const coworkingSpace = await coworkingSpaceService.getCoworkingSpaceById(
        id,
      );
      if (!coworkingSpace) {
        return res.status(404).json({ message: 'Coworking space not found' });
      }
      res.status(200).json(coworkingSpace);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new CoworkingSpaceController();
