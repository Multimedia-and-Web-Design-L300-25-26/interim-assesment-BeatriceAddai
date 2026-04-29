# Coinbase Clone Backend

A Node.js/Express backend API for a Coinbase clone cryptocurrency platform with JWT authentication and MongoDB.

## Features

- User authentication (Register/Login) with JWT
- Protected user profile endpoints
- Cryptocurrency CRUD operations (GET all, GET gainers, GET new listings, POST new)
- Express validation
- CORS enabled

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd coinbase-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your actual values:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

4. **Start the server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User (Protected)
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Cryptocurrency
- `GET /api/crypto` - Get all cryptocurrencies
- `GET /api/crypto/gainers` - Get top gainers (top 10)
- `GET /api/crypto/new` - Get new listings (top 10)
- `POST /api/crypto` - Add new cryptocurrency

## Project Structure

```
coinbase-backend/
├── models/           # Database schemas
│   ├── User.js
│   └── Crypto.js
├── routes/           # API endpoints
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── cryptoRoutes.js
├── controllers/      # Business logic
│   ├── authController.js
│   └── cryptoController.js
├── middleware/       # Custom middleware
│   └── authMiddleware.js
├── config/           # Configuration
│   └── db.js
├── server.js         # Entry point
└── package.json
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `NODE_ENV` - Environment (development/production)

## Notes

- `.env` file is gitignored for security
- `node_modules` is gitignored
- Always use environment variables for sensitive data
- Never commit `.env` file to GitHub

## Author

Student Project for DCIT323
