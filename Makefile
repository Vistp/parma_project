#install and run
run:
	npm install && npm run dev


#build and run, start at root dir
build:
	npm install && npm run build && mkdir -p docs && cd docs && npm run dev


#build and run
build_on_server:
	npm install && export NODE_OPTIONS=--max-old-space-size=4096 && npm run build && cd docs && npm run dev
	mkdir -p /var/www/html
	cp -r /root/projects/parma_project/docs/* /var/www/html/
	nginx -t && rc-service nginx restart && nginx -s reload && rc-service nginx status

#run after pull
nginx_copy:
	mkdir -p /var/www/html
	cp -r /root/projects/parma_project/docs/* /var/www/html/
	nginx -t && rc-service nginx restart && nginx -s reload && rc-service nginx status


#check, restart, reload, see status
nginx:
	nginx -t && rc-service nginx restart && nginx -s reload && rc-service nginx status


#check connections
check:
	echo 'Front'
	curl -I https://gas159.ru

	echo 'Backend'
	curl  https://gas159.ru/api/


#run build package local
serve:
	serve -s