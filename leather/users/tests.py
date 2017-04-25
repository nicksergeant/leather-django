from .signals import activate_user
from django.contrib.auth.models import User
from django.test import RequestFactory, TestCase
from unittest.mock import MagicMock, patch

authenticate = MagicMock()
login = MagicMock()


@patch('leather.users.signals.authenticate', authenticate)
@patch('leather.users.signals.login', login)
class UsersSignalsTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.request = RequestFactory().post('/', {
            "username": "foo",
            "password1": "bar"
        })

    def setUp(self):
        self.user = User.objects.create(username='foo', is_active=False)

    def test_activate_active_user(self):
        """Sets user.is_active to True"""
        activate_user(self.user, self.request)
        self.assertEqual(self.user.is_active, True)

    def test_activate_authenticate_user(self):
        """Authenticates user"""
        activate_user(self.user, self.request)
        authenticate.assert_called_with(username='foo', password='bar')

    def test_activate_login_user(self):
        """Logs in the authenticated user"""
        activate_user(self.user, self.request)
        login.assert_called_with(self.request, authenticate(self.user))
