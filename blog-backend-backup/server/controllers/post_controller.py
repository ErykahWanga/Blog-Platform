from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from server.models.post import Post
from server.models.user import User
from server.extensions import db

post_bp = Blueprint("posts", __name__, url_prefix="/posts")

# Get all posts
@post_bp.route("/", methods=["GET"])
def get_posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts]), 200

# Create a new post
@post_bp.route("/", methods=["POST"])
@jwt_required()
def create_post():
    data = request.get_json()
    title = data.get("title")
    content = data.get("content")

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    user_id = get_jwt_identity()
    new_post = Post(title=title, content=content, user_id=user_id)

    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.to_dict()), 201

# Update a post
@post_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_post(id):
    post = Post.query.get_or_404(id)
    user_id = get_jwt_identity()

    if post.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    post.title = data.get("title", post.title)
    post.content = data.get("content", post.content)

    db.session.commit()
    return jsonify(post.to_dict()), 200

# Delete a post
@post_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_post(id):
    post = Post.query.get_or_404(id)
    user_id = get_jwt_identity()

    if post.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200
