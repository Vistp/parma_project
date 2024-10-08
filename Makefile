#front
frun:
	npm install && npm  run dev
fbuild_on_server:
	npm install && export NODE_OPTIONS=--max-old-space-size=4096 && npm run build && cd docs && npm  run dev
	mkdir -p /var/www/html
	cp -r /root/projects/parma_project/docs/* /var/www/html/
	nginx -t && rc-service nginx restart && nginx -s reload && rc-service nginx status


#nginx
nginx_reload:
	nginx -t && rc-service nginx restart && nginx -s reload && rc-service nginx status


#check
check_front:
	curl -I https://gas159.ru
check_api:
	curl  https://gas159.ru/api/