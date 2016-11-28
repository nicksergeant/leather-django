from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^plaid/webhook/$', views.plaid_webhook, name='plaid-webhook')
]
