from server.app import app
from server.extensions import db
from server.models.user import User
from server.models.post import Post
from server.models.favorite import Favorite

# Run within app context
with app.app_context():
    # Drop all existing tables and recreate them
    db.drop_all()
    db.create_all()

    # Create test users
    user1 = User(username="griffin", email="griffin@example.com")
    user1.set_password("password123")

    user2 = User(username="moringa", email="moringa@example.com")
    user2.set_password("moringa456")

    db.session.add_all([user1, user2])
    db.session.commit()

    # Create test posts
    post1 = Post(title="Intro to Flask", content="Flask is a micro web framework.")
    post2 = Post(title="SQLAlchemy Basics", content="ORM for Python.")
    post3 = Post(title="React vs Vue", content="Both are great frontend frameworks.")

    db.session.add_all([post1, post2, post3])
    db.session.commit()

    # Add some favorites
    fav1 = Favorite(user_id=user1.id, post_id=post1.id)
    fav2 = Favorite(user_id=user1.id, post_id=post2.id)
    fav3 = Favorite(user_id=user2.id, post_id=post2.id)

    db.session.add_all([fav1, fav2, fav3])
    db.session.commit()

    print("🌱 Database seeded successfully!")
