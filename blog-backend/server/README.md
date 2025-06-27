# Blog Platform Backend

This is the backend server for the Blog Platform project.

## Features

- RESTful API for blog posts, users, and comments
- JWT-based authentication
- CRUD operations for posts and comments
- User registration and login
- MongoDB integration

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB

### Installation

```bash
git clone https://github.com/ErykahWanga/blog-backend.git
cd blog-backend/server
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | /api/auth/register | Register a new user      |
| POST   | /api/auth/login    | Login and get a token    |
| GET    | /api/posts         | Get all blog posts       |
| POST   | /api/posts         | Create a new post        |
| GET    | /api/posts/:id     | Get a single post        |
| PUT    | /api/posts/:id     | Update a post            |
| DELETE | /api/posts/:id     | Delete a post            |
| POST   | /api/comments      | Add a comment            |

## License

MIT