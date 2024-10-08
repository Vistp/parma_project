run:
	npm install && export NODE_OPTIONS=--max-old-space-size=4096 && npm run build && cd docs && npm  run dev