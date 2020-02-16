"""
file: app.py
brief: Main entry for the Pixie-Net front end
author: S. V. Paulauskas
date: February 16, 2020
"""
from flask import Flask, render_template

app = Flask(__name__)

if app.config["ENV"] == "production":
    app.config.from_object("config.ProductionConfig")
if app.config["ENV"] == "development":
    app.config.from_object("config.DevelopmentConfig")
else:
    app.config.from_object("config.TestingConfig")


@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html')


@app.route("/setup")
def setup():
    return render_template('setup.html')


@app.route("/daq")
def daq():
    return render_template('daq.html')


@app.route("/analysis")
def analysis():
    return render_template('analysis.html')


if __name__ == "__main__":
    app.run(host=app.config['HOST'], port=app.config['PORT'])
