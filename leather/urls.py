from django.conf.urls import include, url
from django.contrib import admin
from django.http import HttpResponseRedirect
from leather.users.views import LeatherRegistrationView

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),

    url(r'^register/$', lambda x: HttpResponseRedirect('/signup/')),
    url(r'^signup/$', LeatherRegistrationView.as_view(),
        name='registration_register'),
    url(r'', include('registration.backends.default.urls')),

    url(r'^', include('leather.accounts.urls')),
    url(r'^', include('leather.api.urls')),
    url(r'^', include('leather.forecasting.urls')),
    url(r'^', include('leather.ingest.urls')),
    url(r'^', include('leather.homepage.urls')),
]
