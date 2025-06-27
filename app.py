from flask import Flask
from controllers.favorite_controller import favorite_bp

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your-secret-key-here'  # Change this to a secure key
    app.config['SESSION_TYPE'] = 'filesystem'

    # Register blueprints
    app.register_blueprint(favorite_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)