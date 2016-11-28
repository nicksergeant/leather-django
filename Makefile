deploy:
	@git push heroku

update-accounts:
	@python manage.py update_accounts

webpack:
	@node webpack.dev-server.js

.PHONY: db-server \
	deploy \
	update-accounts \
	webpack
