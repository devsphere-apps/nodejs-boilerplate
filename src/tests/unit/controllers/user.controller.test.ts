import { Request, Response } from 'express';
import userController from '../../../controllers/user.controller';
import userService from '../../../services/user.service';
import { mockUserData, mockUserResponse } from '../../fixtures/user.fixtures';

// Mock the user service
jest.mock('../../../services/user.service');

describe('UserController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockRequest = {};
    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      // Arrange
      mockRequest.body = mockUserData;
      (userService.createUser as jest.Mock).mockResolvedValue(mockUserResponse);

      // Act
      await userController.createUser(
        mockRequest as Request,
        mockResponse as Response,
      );

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        statusCode: 201,
        data: mockUserResponse,
      });
    });

    it('should handle errors', async () => {
      // Arrange
      mockRequest.body = mockUserData;
      const error = new Error('Creation failed');
      (userService.createUser as jest.Mock).mockRejectedValue(error);

      // Act
      await userController.createUser(
        mockRequest as Request,
        mockResponse as Response,
      );

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        success: false,
        statusCode: 500,
        error: 'Error creating user',
      });
    });
  });
}); 