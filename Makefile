#install and run
runf:
	npm install && npm run dev

#build and run, start at root dir
buildf:
	npm install && npm run build && mkdir -p docs && cd docs && npm run dev

#build and run
buildrf:
	npm install && export NODE_OPTIONS=--max-old-space-size=4096 && npm run build && cd docs && npm run dev
	mkdir -p /var/www/html
	cp -r /root/projects/parma_project/docs/* /var/www/html/
	nginx -t && rc-service nginx restart && nginx -s reload && rc-service nginx status

#run after pull
cp_nginx:
	mkdir -p /var/www/html
    cp -r /root/projects/parma_project/docs/* /var/www/html/
    nginx -t && rc-service nginx restart && nginx -s reload && rc-service nginx status


#check, restart, reload, see status
nginx:
	nginx -t && rc-service nginx restart && nginx -s reload && rc-service nginx status


#check
check_front:
	curl -I https://gas159.ru
check_api:
	curl  https://gas159.ru/api/

#run build package local
serve:
	serve -s