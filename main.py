from flask import Flask
from waitress import serve

app = Flask('__name__')


@app.route('/api/v1/hello-world-6')
def hello_world():
    return "Hello World 6"


if __name__ == '__main__':
    app.run(debug=True)

serve(app)
