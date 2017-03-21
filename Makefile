DEBUG_WEBHOOK_IP=$(shell curl icanhazip.com)

deploy:
	@git push heroku
	@heroku run python manage.py migrate

run:
	export DEBUG_WEBHOOK_IP=$(DEBUG_WEBHOOK_IP); python manage.py runserver 0.0.0.0:8000

update-accounts:
	@python manage.py update_accounts

webpack:
	@node webpack.dev-server.js

.PHONY: \
	deploy \
	local-assets \
	update-accounts \
	sass \
	webpack
