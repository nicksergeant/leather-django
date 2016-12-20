deploy:
	@git push heroku

local-assets:
	make sass & make webpack

update-accounts:
	@python manage.py update_accounts

sass:
	@node_modules/node-sass/bin/node-sass --watch --output-style compressed leather/static/css/styles.scss > leather/static/css/styles.css

webpack:
	@node webpack.dev-server.js

.PHONY: \
	deploy \
	local-assets \
	update-accounts \
	webpack
