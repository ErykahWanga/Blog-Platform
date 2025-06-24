from flask import Flask
from flask_cors import CORS
from .config import Config

# ✅ Only import these from extensions, don't reinitialize
from server.extensions import db, migrate, jwt
from server.controllers.auth_controller import auth_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # ✅ Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    # ✅ Register your authentication blueprint
    app.register_blueprint(auth_bp, url_prefix='/auth')

    @app.route('/')
    def home():
        return {'message': 'API running!'}

    return app
