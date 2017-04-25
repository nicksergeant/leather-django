from django.conf.urls import include, url
from django.contrib import admin
from django.http import HttpResponseRedirect
from registration.backends.simple.views import RegistrationView
from registration.forms import RegistrationFormUniqueEmail


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),

    url(r'^admin$', lambda x: HttpResponseRedirect('/admin/')),
    url(r'^login$', lambda x: HttpResponseRedirect('/login/')),
    url(r'^logout$', lambda x: HttpResponseRedirect('/logout/')),
    url(r'^register/$', lambda x: HttpResponseRedirect('/signup/')),
    url(r'^signup$', lambda x: HttpResponseRedirect('/signup/')),
    url(r'^password\/change$',
        lambda x: HttpResponseRedirect('/password/change/')),

    url(r'^signup/$', RegistrationView.as_view(
        form_class=RegistrationFormUniqueEmail,
        success_url='/'
    )),

    url(r'', include('registration.backends.simple.urls')),

    url(r'^', include('leather.accounts.urls')),
    url(r'^', include('leather.api.urls')),
    url(r'^', include('leather.ingest.urls')),

    url(r'^', include('leather.app.urls')),
]
