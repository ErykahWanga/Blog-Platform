from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)
bcrypt = Bcrypt(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    posts = db.relationship('Post', backref='author', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comments = db.relationship('Comment', backref='post', lazy=True)
    post_tags = db.relationship('PostTag', backref='post', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'author': self.author.username,
            'tags': [{'name': pt.tag.name, 'rating': pt.rating} for pt in self.post_tags]
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'author': self.author.username
        }

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    post_tags = db.relationship('PostTag', backref='tag', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

class PostTag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'post_id': self.post_id,
            'tag_id': self.tag_id,
            'rating': self.rating
        }

# Routes
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@app.route('/api/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())

@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts])

@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    post = Post(
        title=data['title'],
        content=data['content'],
        author_id=data['author_id']
    )
    db.session.add(post)
    db.session.commit()

    for tag_data in data.get('tags', []):
        tag = Tag.query.filter_by(name=tag_data['name']).first()
        if not tag:
            tag = Tag(name=tag_data['name'])
            db.session.add(tag)
            db.session.commit()
        post_tag = PostTag(
            post_id=post.id,
            tag_id=tag.id,
            rating=tag_data['rating']
        )
        db.session.add(post_tag)
    db.session.commit()

    return jsonify(post.to_dict()), 201

@app.route('/api/posts/<int:id>', methods=['GET'])
def get_post(id):
    post = Post.query.get_or_404(id)
    return jsonify(post.to_dict())

@app.route('/api/posts/<int:id>', methods=['PUT'])
def update_post(id):
    post = Post.query.get_or_404(id)
    data = request.get_json()
    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    db.session.commit()
    return jsonify(post.to_dict())

@app.route('/api/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return '', 204

@app.route('/api/comments', methods=['POST'])
def create_comment():
    data = request.get_json()
    comment = Comment(
        content=data['content'],
        post_id=data['post_id'],
        author_id=data['author_id']
    )
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201

@app.route('/api/comments', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.to_dict() for comment in comments])

@app.route('/api/tags', methods=['POST'])
def create_tag():
    data = request.get_json()
    tag = Tag(name=data['name'])
    db.session.add(tag)
    db.session.commit()
    return jsonify(tag.to_dict()), 201

@app.route('/api/tags', methods=['GET'])
def get_tags():
    tags = Tag.query.all()
    return jsonify([tag.to_dict() for tag in tags])

@app.route('/api/post_tags', methods=['POST'])
def create_post_tag():
    data = request.get_json()
    post_tag = PostTag(
        post_id=data['post_id'],
        tag_id=data['tag_id'],
        rating=data['rating']
    )
    db.session.add(post_tag)
    db.session.commit()
    return jsonify(post_tag.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)