from django.contrib.auth import authenticate, login
from registration.signals import user_registered
from django.dispatch import receiver


@receiver(user_registered)
def activate_user(user, request, **kwargs):
    user.is_active = True
    user.save()
    user = authenticate(username=request.POST['username'],
                        password=request.POST['password1'])
    login(request, user)
