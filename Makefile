BIN = `npm bin`
FRONTEND = ./frontend
BACKEND = `pwd`

start:
	@npm start

build: clean
	@npm run build

frontend: submodule
	@env BACKEND=$(BACKEND) make -C $(FRONTEND) web

deploy:
	@git push github master

submodule:
	@git submodule init
	@git submodule update

clean:
	@rm -rf dist/*

env:
	@heroku config -s > .env
