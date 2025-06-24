from app import app, db, User, Post, Comment, Tag, PostTag
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

with app.app_context():
    db.drop_all()
    db.create_all()

    user = User(
        username='john',
        email='john@example.com',
        password=bcrypt.generate_password_hash('password').decode('utf-8')
    )
    db.session.add(user)
    db.session.commit()

    post = Post(title='My Blog', content='This is my first post.', author_id=user.id)
    db.session.add(post)
    db.session.commit()

    tag = Tag(name='Tech')
    db.session.add(tag)
    db.session.commit()

    post_tag = PostTag(post_id=post.id, tag_id=tag.id, rating=4)
    db.session.add(post_tag)
    db.session.commit()

    comment = Comment(content='Nice post!', post_id=post.id, author_id=user

.id)
    db.session.add(comment)
    db.session.commit()