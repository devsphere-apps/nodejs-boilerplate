import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Global test setup
beforeAll(async () => {
  // Add any global setup here
});

// Global test teardown
afterAll(async () => {
  // Add any global cleanup here
});

// Mock winston logger before all tests
jest.mock('../config/logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn()
}));

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
}); 