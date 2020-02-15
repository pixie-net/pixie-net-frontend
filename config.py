"""
file: config.py
brief: Configuration file for Flask application
author: S. V. Paulauskas
date: February 15, 2020
"""


class Config(object):
    SITE_NAME = 'Pixie-Net'

    DEBUG = False
    TESTING = False


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
