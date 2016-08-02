BIN = `npm bin`
FRONTEND = ./frontend
BACKEND = `pwd`

start:
	@npm start

frontend:
	@env BACKEND=$(BACKEND) make -C $(FRONTEND)

deploy:
	@git push github master

submodule:
	@git submodule init
	@git submodule update
