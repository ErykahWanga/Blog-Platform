from flask import Blueprint, request, jsonify
from app import db
from models.favorite import Favorite
from models.user import User
from models.post import Post

favorite_bp = Blueprint('favorites', __name__)

@favorite_bp.route('/favorites/', methods=['POST'])
def toggle_favorite():
    data = request.get_json()
    user_id = data.get('user_id')
    post_id = data.get('post_id')
    if not user_id or not post_id:
        return jsonify({'error': 'user_id and post_id are required'}), 400
    user = User.query.get(user_id)
    post = Post.query.get(post_id)
    if not user or not post:
        return jsonify({'error': 'User or Post not found'}), 404
    favorite = Favorite.query.filter_by(user_id=user_id, post_id=post_id).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'message': 'Post unfavorited', 'favorited': False}), 200
    else:
        favorite = Favorite(user_id=user_id, post_id=post_id)
        db.session.add(favorite)
        db.session.commit()
        return jsonify({'message': 'Post favorited', 'favorited': True}), 201