"""
file: config.py
brief: Configuration file for Flask application
author: S. V. Paulauskas
date: February 15, 2020
"""


class Config(object):
    SITE_NAME = 'Pixie-Net'
    HOST = '0.0.0.0'
    PORT = '5001'
    SECRET_KEY = 'a-super-secret-key-that-nobody-will-discover'

    DEBUG = False
    TESTING = False


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
