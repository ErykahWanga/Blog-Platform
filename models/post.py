from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Make sure Favorite is imported or defined before Post
from .favorite import Favorite  # Adjust the import path as needed

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    favorites = db.relationship('Favorite', backref='post', lazy=True)

    def __repr__(self):
        return f'<Post {self.id}>'