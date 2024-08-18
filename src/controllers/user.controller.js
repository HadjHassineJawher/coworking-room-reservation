const userService = require('../services/user.service');
class UserController {
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({
        message: 'User created successfully',
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  async joinCoworkingSpace(req, res) {
    try {
      const { userId, coworkingSpaceId, code } = req.body;
      const user = await userService.joinCoworkingSpace(
        userId,
        coworkingSpaceId,
        code,
      );
      res.status(200).json({
        message: 'Joined coworking space successfully',
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }

  async getUserCoworkingSpaces(req, res) {
    try {
      const userId = req.params.userId;
      const coworkingSpaces = await userService.getUserCoworkingSpaces(userId);
      res.status(200).json(coworkingSpaces);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
