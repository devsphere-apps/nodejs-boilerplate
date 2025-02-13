export const mockUserData = {
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123',
};

export const mockUserResponse = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'test@example.com',
  name: 'Test User',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockUsers = [
  mockUserResponse,
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    email: 'test2@example.com',
    name: 'Test User 2',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
]; 