NPM = npm --silent
start:;@$(NPM) start;
test:;@$(NPM) test;

all: start
.PHONY: test
