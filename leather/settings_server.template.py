from settings import INSTALLED_APPS


ALLOWED_HOSTS = ['leatherapp.com']

INTERNAL_IPS = ('127.0.0.1')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'leather',
        'USER': 'leather',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': ''
    }
}

DEBUG = False

CSRF_COOKIE_SECURE = True

SECURE_CONTENT_TYPE_NOSNIFF = True

SESSION_COOKIE_SECURE = True

SECURE_SSL_REDIRECT = True

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

INSTALLED_APPS += ('raven.contrib.django.raven_compat',)

RAVEN_CONFIG = {
    'dsn': '',
}

SECRET_KEY = ''

STATIC_ROOT = '/var/www/leather/static/'
