from registration.backends.default.views import RegistrationView
from registration.forms import RegistrationFormUniqueEmail


class LeatherRegistrationView(RegistrationView):
    """Custom registration view that sets the success URL to '/'."""
    form_class = RegistrationFormUniqueEmail

    def get_success_url(self, user):
        return '/'
