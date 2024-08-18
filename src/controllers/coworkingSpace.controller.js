const coworkingSpaceService = require('../services/coworkingSpace.service');

class CoworkingSpaceController {
  async create(req, res) {
    try {
      const coworkingSpaceData = req.body;
      const coworkingSpace = await coworkingSpaceService.createCoworkingSpace(
        coworkingSpaceData,
      );

      res.status(201).json({
        message: 'coworking Space Created successfully',
        coworkingSpace,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating coworking space' });
    }
  }
}

module.exports = new CoworkingSpaceController();
