# Node.js TypeScript Clean Architecture API

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [PostgreSQL Setup](#postgresql-setup)
    - [For MacOS](#for-macos)
    - [For Ubuntu/Debian](#for-ubuntudebian)
  - [Environment Setup](#environment-setup)
  - [Database Migration](#database-migration)
- [Development](#development)
- [API Testing](#api-testing)
  - [Users Endpoints](#users-endpoints)
- [Running Tests](#running-tests)
  - [Test Structure](#test-structure)
  - [Running Tests](#running-tests-1)
  - [Test Coverage](#test-coverage)
- [Code Quality](#code-quality)
- [Troubleshooting](#troubleshooting)
  - [Database Issues (MacOS)](#database-issues-macos)
  - [Database Issues (Ubuntu/Debian)](#database-issues-ubuntudebian)
  - [Common Errors](#common-errors)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)

## **Project Overview**
This project implements a production-ready Node.js application using TypeScript and Clean Architecture principles. It includes a complete CRUD API with user management, database integration, validation, and logging.

## **Features**
- 🔐 **TypeScript** for type safety
- 🚀 **Express.js** for API handling
- 📦 **Prisma** with PostgreSQL
- ✅ **Zod** for validation
- 📝 **Winston** for logging
- 🧪 **Jest** for testing
- 🎯 **ESLint** and **Prettier** for code quality

## **Prerequisites**
- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## **Getting Started**

1. **Clone and Install Dependencies**
   ```bash
   git clone https://github.com/devsphere-apps/nodejs-boilerplate.git
   cd nodejs-boilerplate
   npm install
   ```

2. **PostgreSQL Setup**

### For MacOS:
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PostgreSQL
brew install postgresql@14

# Start PostgreSQL service
brew services start postgresql

# Verify PostgreSQL is running
brew services list

# Create database and user
psql postgres

# In the PostgreSQL prompt:
postgres=# CREATE DATABASE mydb;
postgres=# CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
postgres=# GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
postgres=# \q

# Common PostgreSQL Commands (MacOS):
brew services start postgresql    # Start PostgreSQL
brew services stop postgresql     # Stop PostgreSQL
brew services restart postgresql  # Restart PostgreSQL
brew services list               # Check status
```

### Alternative: Postgres.app (MacOS)
1. Download from [postgresapp.com](https://postgresapp.com/)
2. Drag to Applications folder
3. Double click to start
4. Click "Initialize" to create a new PostgreSQL server

### For Ubuntu/Debian:
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo service postgresql start

# Create database
sudo -u postgres psql
postgres=# CREATE DATABASE mydb;
postgres=# CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
postgres=# GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"
   LOG_LEVEL=info
   ```

4. **Database Migration**
   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate
   ```

## **Development**

### Start the Server
```bash
# Development mode with hot-reload
npm run dev

# Production build
npm run build
npm start
```

## **API Testing**

### Users Endpoints

1. **Create User**
   ```bash
   curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123"
     }'
   ```

2. **Get All Users**
   ```bash
   curl http://localhost:3000/api/users
   ```

3. **Get User by ID**
   ```bash
   curl http://localhost:3000/api/users/YOUR_USER_ID
   ```

4. **Update User**
   ```bash
   curl -X PATCH http://localhost:3000/api/users/YOUR_USER_ID \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Updated Name"
     }'
   ```

5. **Delete User**
   ```bash
   curl -X DELETE http://localhost:3000/api/users/YOUR_USER_ID
   ```

## **Running Tests**
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## **Code Quality**
```bash
# Lint code
npm run lint

# Format code
npm run format
```

## **Troubleshooting**

### Database Issues (MacOS)
1. **PostgreSQL Service Issues**
   ```bash
   # Check if PostgreSQL is running
   brew services list

   # Restart PostgreSQL
   brew services restart postgresql

   # View PostgreSQL logs
   tail -f /usr/local/var/log/postgres.log
   ```

2. **Clean Reinstall PostgreSQL**
   ```bash
   brew services stop postgresql
   brew uninstall postgresql
   brew install postgresql
   brew services start postgresql
   ```

### Database Issues (Ubuntu/Debian)
1. **Check PostgreSQL Status**
   ```bash
   sudo service postgresql status
   ```

2. **Reset Database**
   ```bash
   npx prisma migrate reset
   ```

3. **Update Schema**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

### Common Errors

1. **Database Connection Failed**
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env
   - Ensure database and user exist with correct permissions

2. **Port Already in Use**
   - Change PORT in .env
   - Check for other running services on port 3000

3. **Prisma Client Error**
   ```bash
   npm run prisma:generate
   ```

## **Project Structure**
```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── services/       # Business logic
├── models/         # Data models
├── middlewares/    # Express middlewares
├── routes/         # API routes
├── utils/          # Utility functions
├── prisma/         # Prisma configuration
└── tests/          # Test files
    ├── setup.ts                # Test configuration
    ├── fixtures/              # Test data
    │   └── user.fixtures.ts
    ├── unit/                 # Unit tests
    │   ├── services/
    │   │   └── user.service.test.ts
    │   └── controllers/
    │       └── user.controller.test.ts
    └── integration/          # Integration tests
        └── user.integration.test.ts
```

## **Available Scripts**
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run lint`: Check code style
- `npm run format`: Format code
- `npm run prisma:generate`: Generate Prisma client
- `npm run prisma:migrate`: Run database migrations

## **Testing**

### **Test Structure**
- `tests/setup.ts`: Global test configuration and mocks
- `tests/fixtures/`: Contains test data and mock objects
- `tests/unit/`: Unit tests for services and controllers
- `tests/integration/`: End-to-end API tests

### **Running Tests**
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Run only unit tests
npm run test:unit

# Run tests in watch mode
npm run test:watch
```

### **Test Coverage**
Coverage reports are generated in the `coverage/` directory when running:
```bash
npm run test:cov
```



