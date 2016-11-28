from django.apps import AppConfig


class LeatherAppConfig(AppConfig):

    name = 'leather'
    verbose_name = 'Leather'

    def ready(self):
        from leather.users import signals
