const {NODE_ENV, PORT, SCALE} = process.env;
global.production = (NODE_ENV === 'production');

// Globalize app dirs
const {join} = require('path')
const {cwd} = require('process')
const dirs = ['middlewares', 'routes', 'models'];
dirs.forEach(dir => global[dir] = join(__dirname, dir) + '/');

const CoffeeScript = require('coffee-script/register');
const app = require('./app.coffee');

app.listen(PORT, function() {
  console.log(`Express listening on port ${PORT}`);
});
