from flask import Blueprint, request, jsonify
from app import db
from models.post import Post
from models.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity

post_bp = Blueprint('post_bp', __name__, url_prefix='/posts')

# GET /posts
@post_bp.route('/', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts]), 200

# POST /posts
@post_bp.route('/', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    if not data.get("title") or not data.get("content"):
        return jsonify({"error": "Missing fields"}), 400

    post = Post(title=data["title"], content=data["content"], user_id=current_user_id)
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201

# PUT /posts/<id>
@post_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_post(id):
    post = Post.query.get_or_404(id)
    current_user_id = get_jwt_identity()
    
    if post.user_id != current_user_id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    post.title = data.get("title", post.title)
    post.content = data.get("content", post.content)
    db.session.commit()
    return jsonify(post.to_dict()), 200

# DELETE /posts/<id>
@post_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_post(id):
    post = Post.query.get_or_404(id)
    current_user_id = get_jwt_identity()

    if post.user_id != current_user_id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200
