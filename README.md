# Leather

## Local installation and development

1. Clone the repo.
2. `cd leather`
3. `workon leather`
4. `pip install -r requirements.txt`
5. `npm install`
6. Install PostgreSQL somehow.
7. `createdb leather`
8. `createuser leather`
9. `psql` and then:
10. `grant all privileges on leather to leather;` (then `<Return>`)
11. (exit psql CLI w/ `Ctrl-C`)
12. `python manage.py migrate`
13. `python manage.py createsuperuser`
14. Ask Nick for a `.env` file with some local Plaid dev keys.

Then, run the app in two separate consoles:

1. `make run`
2. `make webpack`

In a browser:

1. Visit [http://localhost:8000/login/](http://localhost:8000/login/)
2. Login with the user/pass you created in the `createsuperuser` step above.
3. Click "Link your bank account" and follow the steps.
