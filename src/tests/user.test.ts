import { PrismaClient } from '@prisma/client';
import userService from '../services/user.service';

// Mock Prisma
jest.mock('@prisma/client');

describe('UserService', () => {
  let prisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    prisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    const mockUserData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    };

    const mockCreatedUser = {
      id: '123',
      email: mockUserData.email,
      name: mockUserData.name,
      createdAt: new Date(),
    };

    it('should create a user successfully', async () => {
      (prisma.user.create as jest.Mock).mockResolvedValue(mockCreatedUser);

      const result = await userService.createUser(mockUserData);

      expect(result).toEqual(mockCreatedUser);
      expect(prisma.user.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if creation fails', async () => {
      const error = new Error('Database error');
      (prisma.user.create as jest.Mock).mockRejectedValue(error);

      await expect(userService.createUser(mockUserData)).rejects.toThrow(error);
    });
  });

  // Add more test cases for other methods...
}); 