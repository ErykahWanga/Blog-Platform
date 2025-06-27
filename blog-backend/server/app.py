from flask import Flask
from flask_cors import CORS
from .config import Config
from server.extensions import db, migrate, jwt
from server.controllers.auth_controller import auth_bp
from server.controllers.post_controller import post_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(post_bp, url_prefix='/posts')

    @app.route('/')
    def home():
        return {'message': 'API running!'}

    return app