from django.contrib import admin
from django.contrib.auth.models import Group
from leather.users.models import Profile
from registration.models import RegistrationProfile


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ['user__username']

admin.site.register(Profile, ProfileAdmin)
admin.site.unregister(Group)
admin.site.unregister(RegistrationProfile)
