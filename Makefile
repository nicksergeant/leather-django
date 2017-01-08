DEBUG_WEBHOOK_IP=$(shell curl icanhazip.com)

deploy:
	@git push heroku

local-assets:
	make sass & make webpack

run:
	export DEBUG_WEBHOOK_IP=$(DEBUG_WEBHOOK_IP); python manage.py runserver 0.0.0.0:8000

sass:
	@node_modules/node-sass/bin/node-sass \
		--watch \
		--output-style compressed \
		--output leather/static/css \
		leather/static/css

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
