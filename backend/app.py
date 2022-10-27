from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_migrate import Migrate
from waitress import serve

app = Flask('__name__')

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:1111@localhost/dbivan"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

@app.route('/api/v1/hello-world-6')
def hello_world():
    return "Hello World 6"


if __name__ == "__main__":
    print("http://127.0.0.1:8080")
    serve(app, host='127.0.0.1', port=8080)
