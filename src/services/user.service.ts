import prisma from '../prisma/client';
import { CreateUserInput, UpdateUserInput } from '../models/user.model';
import logger from '../config/logger';
import { hash } from 'bcrypt';

export class UserService {
  async createUser(data: CreateUserInput) {
    try {
      const hashedPassword = await hash(data.password, 10);
      const user = await prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  async getUsers() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });
      return users;
    } catch (error) {
      logger.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      logger.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }

  async updateUser(id: string, data: UpdateUserInput) {
    try {
      const updateData = { ...data };
      if (data.password) {
        updateData.password = await hash(data.password, 10);
      }
      
      const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error) {
      logger.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      await prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      logger.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
}

export default new UserService(); 