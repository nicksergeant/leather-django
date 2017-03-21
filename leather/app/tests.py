from django.test import TestCase
from django.test.client import Client
from django.contrib.auth.models import User


class AppViewTest(TestCase):
    def test_get_unauthenticated(self):
        client = Client()
        response = client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'homepage.html')
        self.assertEqual(response.context['user'].is_authenticated(), False)

    def test_get_authenticated(self):
        User.objects.create_user('foo', None, 'bar')
        client = Client()
        client.login(username='foo', password='bar')
        response = client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'app.html')
        self.assertEqual(response.context['user'].is_authenticated(), True)
