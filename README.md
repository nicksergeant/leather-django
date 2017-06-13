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
10. `psql` and then:
11. `grant all privileges on leather to leather;` (then `<Return>`)
12. (exit psql CLI w/ `Ctrl-C`)
13. `python manage.py migrate`
14. `python manage.py createsuperuser`
15. Ask Nick for a `.env` file with some local Plaid dev keys.

Then, run the app in two separate consoles:

1. `make run`
2. `make webpack`

In a browser:

1. Visit [http://localhost:8000/login/](http://localhost:8000/login/)
2. Login with the user/pass you created in the `createsuperuser` step above.
3. Click "Link your bank account" and follow the steps.
