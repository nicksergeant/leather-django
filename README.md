# Leather

## Local installation and development

1. Clone the repo.
2. `cd leather`
3. `workon leather`
4. `pip install -r requirements.txt`
5. `brew install yarn` (if necessary)
6. `yarn`
7. Install PostgreSQL somehow.
8. `createuser leather`
9. `createdb leather --owner=leather`
10. `python manage.py migrate`
11. `python manage.py createsuperuser`
12. Ask Nick for a `.env` file with some local Plaid dev keys, or create one
without Plaid access:

```
DEBUG=true
PLAID_CLIENT_ID=123
PLAID_SECRET=123
POSTMARK_API_KEY=123
SECRET_KEY=somethingsecret
SERVER_EMAIL=user@domain.com
```

Then, run the app in two separate consoles:

1. `make run`
2. `make webpack`

In a browser:

1. Visit [http://localhost:8000/login/](http://localhost:8000/login/)
2. Login with the user/pass you created in the `createsuperuser` step above.
3. Click "Link your bank account" and follow the steps.
