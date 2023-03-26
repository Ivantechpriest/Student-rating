from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager


app = Flask('__name__')

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:12345@localhost/student_ratingdb"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "realsecret"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
