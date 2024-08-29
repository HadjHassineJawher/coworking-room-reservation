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

  async updateUser(req, res) {
    try {
      const userId = req.params.userId;
      const updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      };
      const updatedUser = await userService.updateUser(userId, updateData);
      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.authenticateUser(
        email,
        password,
      );

      res.status(200).json({
        message: 'Login successful',
        user,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error during login' });
    }
  }
}

module.exports = new UserController();
