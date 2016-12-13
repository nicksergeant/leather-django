import dj_database_url
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

ACCOUNT_ACTIVATION_DAYS = 0
ALLOWED_HOSTS = ['*']
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SECURE = True if 'USE_SSL' in os.environ else False
DEBUG = True if 'DEBUG' in os.environ else False
DEBUG_WEBHOOK_IP = '123.45.67.890'
DEFAULT_FROM_EMAIL = os.environ.get('SERVER_EMAIL', '')
EMAIL_BACKEND = 'postmark.django_backend.EmailBackend'
INTERNAL_IPS = ['127.0.0.1']
LANGUAGE_CODE = 'en-us'
LOGIN_REDIRECT_URL = '/'
LOGIN_URL = '/login/'
MEDIA_ROOT = os.path.join(PROJECT_ROOT, 'media')
PLAID_CLIENT_ID = os.environ.get('PLAID_CLIENT_ID', '')
PLAID_SECRET = os.environ.get('PLAID_SECRET', '')
POSTMARK_API_KEY = os.environ.get('POSTMARK_API_KEY', '')
ROOT_URLCONF = 'leather.urls'
SECRET_KEY = os.environ.get('SECRET_KEY', '')
SECURE_BROWSER_XSS_FILTER = True if 'USE_SSL' in os.environ else False
SECURE_CONTENT_TYPE_NOSNIFF = True if 'USE_SSL' in os.environ else False
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True if 'USE_SSL' in os.environ else False
SERVER_EMAIL = os.environ.get('SERVER_EMAIL', '')
SESSION_COOKIE_SECURE = True if 'USE_SSL' in os.environ else False
STATICFILES_DIRS = (os.path.join(PROJECT_ROOT, 'static'),)
STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles')
STATIC_URL = '/static/'
TIME_ZONE = 'America/New_York'
USE_I18N = True
USE_L10N = True
USE_TZ = True
USE_X_FORWARDED_HOST = True
WSGI_APPLICATION = 'leather.wsgi.application'
X_FRAME_OPTIONS = 'DENY'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'leather',
        'USER': 'leather',
        'PASSWORD': 'leather',
        'HOST': 'localhost',
        'PORT': ''
    }
}

DATABASES['default'].update(dj_database_url.config(conn_max_age=500))

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.humanize',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'registration',
    'rest_framework',
    'webpack_loader',

    'leather.apps.LeatherAppConfig',
    'leather.accounts',
    'leather.base',
    'leather.dashboard',
    'leather.forecasting',
    'leather.homepage',
    'leather.ingest',
    'leather.users',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'leather.api.pagination.Pagination',
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated'
    ],
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'ORDERING_PARAM': 'sort',
    'PAGE_SIZE': 10
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'leather', 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': 'webpack.stats.json',
        'POLL_INTERVAL': 0.1,
        'IGNORE': ['.+\.hot-update.js', '.+\.map']
    }
}
