from app import create_app
from models.user import User, db
from models.post import Post
from models.favorite import Favorite

app = create_app()

with app.app_context():
    # Drop all tables and recreate
    db.drop_all()
    db.create_all()

    # Add sample users
    user1 = User()
    user2 = User()
    db.session.add_all([user1, user2])
    db.session.commit()

    # Add sample posts
    post1 = Post()
    post2 = Post()
    db.session.add_all([post1, post2])
    db.session.commit()

    # Add sample favorites
    favorite1 = Favorite(user_id=user1.id, post_id=post1.id)
    db.session.add(favorite1)
    db.session.commit()

    print("Database seeded successfully!")