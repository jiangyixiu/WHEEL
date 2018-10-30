from flask import Flask
from app import app


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"