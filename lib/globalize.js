const SQL = require('./sql')
const {NODE_ENV} = process.env;
global.production = (NODE_ENV === 'production');

if (!production) {
  const dotenv = require('dotenv');
  dotenv.config();
}

require('app-module-path').addPath(process.cwd());
SQL.hook();
