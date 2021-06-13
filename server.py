import flask
from flask import Flask
app = Flask(__name__)

@app.route('/')
def serve_index():
    return flask.send_file('static/index.html')

# Disable in production
@app.route('/<path:path>')
def serve_file(path):
    if path == None:
        path = 'index.html'
    return flask.send_from_directory('static', path)

if __name__ == "__main__":
    app.run()
