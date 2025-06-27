<<<<<<< HEAD
from app import db
=======
# server/models/post.py

from server.extensions import db
>>>>>>> 7eaf4fd85af37d051b40e6d1a4fbc27104e1e420
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
<<<<<<< HEAD
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

=======
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
>>>>>>> 7eaf4fd85af37d051b40e6d1a4fbc27104e1e420
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
<<<<<<< HEAD
            "timestamp": self.timestamp.isoformat(),
=======
            "created_at": self.created_at.isoformat(),
>>>>>>> 7eaf4fd85af37d051b40e6d1a4fbc27104e1e420
            "user_id": self.user_id
        }
