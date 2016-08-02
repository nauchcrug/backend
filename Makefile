BIN = `npm bin`
FRONTEND = ./frontend
BACKEND = `pwd`

start:
	@coffee app.coffee

frontend:
	@env BACKEND=$(BACKEND) make -C $(FRONTEND)

deploy:
	@git push github master

submodule:
	@git submodule init
	@git submodule update
