from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from controllers.favorite_controller import favorite_bp

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    CORS(app)
    app.register_blueprint(favorite_bp, url_prefix='/api')
    with app.app_context():
        from models import user, post, favorite
        db.create_all()
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)