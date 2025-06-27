# Blog Platform Backend

This is the backend server for the Blog Platform project, built with Flask, SQLAlchemy, and JWT authentication.

## Features

- RESTful API for blog posts and users
- JWT-based authentication (login, signup)
- CRUD operations for posts
- User registration and login
- SQLite (default) or PostgreSQL/MySQL via SQLAlchemy
- CORS enabled for frontend integration

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
git clone https://github.com/ErykahWanga/blog-backend.git
cd blog-backend/server
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in the `server` directory (or set environment variables):

```
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
DATABASE_URL=sqlite:///app.db
```

### Running the Server

```bash
flask db upgrade  # Run migrations
flask run
```

The server will run on `http://localhost:5000`.

## API Endpoints

| Method | Endpoint            | Description                |
|--------|---------------------|----------------------------|
| POST   | /auth/signup        | Register a new user        |
| POST   | /auth/login         | Login and get a JWT token  |
| GET    | /posts/             | Get all blog posts         |
| POST   | /posts/             | Create a new post (auth)   |
| PUT    | /posts/&lt;id&gt;   | Update a post (auth)       |
| DELETE | /posts/&lt;id&gt;   | Delete a post (auth)       |

## Project Structure

```
server/
├── controllers/
│   ├── auth_controller.py
│   └── post_controller.py
├── models/
│   ├── user.py
│   └── post.py
├── extensions.py
├── config.py
├── app.py
├── requirements.txt
```

## Example Models

**User**
```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    # ...methods for password hashing and serialization
```

**Post**
```python
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # ...serialization method
```

## License

MIT