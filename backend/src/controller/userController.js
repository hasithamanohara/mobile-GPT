import UserService from '../service/userService.js';
import { validationResult } from 'express-validator';

class UserController {
  static async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password, role } = req.body;
      const result = await UserService.register({ username, email, password, role });
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const result = await UserService.login({ username, password });
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user.id;
      const updates = req.body;
      const result = await UserService.updateUser(userId, updates);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

static async getUser(req, res) {
  try {
    const userId = req.user.id;
    const user = await UserService.getUser(userId);
    res.json(user);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ 
      message: err.messages 
    });
  }
}


  static async deleteUser(req, res) {
    try {
      const userId = req.user.id;
      const result = await UserService.deleteUser(userId);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default UserController;
