import { PrismaClient } from '@prisma/client';
import userService from '../../../services/user.service';
import { mockUserData, mockUserResponse, mockUsers } from '../../fixtures/user.fixtures';
import prisma from '../../../prisma/client';

// Mock prisma client
jest.mock('../../../prisma/client');

// Mock logger to silence error logs during tests
jest.mock('../../../config/logger', () => ({
  error: jest.fn(),
  info: jest.fn()
}));

// Mock the Prisma client module
jest.mock('../../../prisma/client', () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      // Arrange
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUserResponse);

      // Act
      const result = await userService.createUser(mockUserData);

      // Assert
      expect(result).toEqual(mockUserResponse);
    });

    it('should throw an error if creation fails', async () => {
      // Arrange
      const error = new Error('Database error');
      (prisma.user.create as jest.Mock).mockRejectedValue(error);

      // Act & Assert
      await expect(userService.createUser(mockUserData))
        .rejects
        .toThrow('Database error');
    });
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      // Arrange
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      // Act
      const result = await userService.getUsers();

      // Assert
      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });
}); 