import { Request, Response } from 'express';
import userService from '../services/user.service';
import { ApiResponse } from '../utils/responseHandler';
import logger from '../config/logger';

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(ApiResponse.success(201, user));
    } catch (error) {
      logger.error('Create user error:', error);
      res.status(500).json(ApiResponse.error(500, 'Error creating user'));
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getUsers();
      res.status(200).json(ApiResponse.success(200, users));
    } catch (error) {
      logger.error('Get users error:', error);
      res.status(500).json(ApiResponse.error(500, 'Error fetching users'));
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json(ApiResponse.error(404, 'User not found'));
      } else {
        res.status(200).json(ApiResponse.success(200, user));
      }
    } catch (error) {
      logger.error('Get user error:', error);
      res.status(500).json(ApiResponse.error(500, 'Error fetching user'));
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(ApiResponse.success(200, user));
    } catch (error) {
      logger.error('Update user error:', error);
      res.status(500).json(ApiResponse.error(500, 'Error updating user'));
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      logger.error('Delete user error:', error);
      res.status(500).json(ApiResponse.error(500, 'Error deleting user'));
    }
  }
}

export default new UserController(); 