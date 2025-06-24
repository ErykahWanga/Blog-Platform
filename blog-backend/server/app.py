from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import Config

db = SQLAlchemy()
migrate = Migrate()  # ← This was missing
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)  # ← This line needs `migrate` to be defined
    jwt.init_app(app)
    CORS(app)

    @app.route('/')
    def home():
        return {'message': 'API running!'}

    return app
