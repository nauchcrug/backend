const {join, resolve} = require('path');
const {cwd} = process;
const {NODE_ENV} = process.env;
global.production = (NODE_ENV === 'production');

if (!production) {
  const dotenv = require('dotenv');
  dotenv.config();
}

[ 'middlewares',
  'migrations',
  'routes',
  'models',
  'templates',
  'lib'
].forEach((dir) => {
  global[dir] = (join(cwd(), dir)) + '/';
});

/*const CSON = require('cson');
global.CSON = CSON;
require.extensions['.cson'] = function(module, filename) {
  let parsed = CSON.parseFile(filename);
  module.exports = parsed;
};*/ // Максу не нравится индентативный синтаксис :(

SQL = require(lib + 'sql');
global.SQL = SQL;
require.extensions['.sql'] = function(module, filename) {
  let parsed = SQL.parse;
  module.exports = parsed;
};
