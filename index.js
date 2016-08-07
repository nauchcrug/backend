const CoffeeScript = require('coffee-script/register');
const globalize = require('./lib/globalize');

const {PORT, SCALE} = process.env;
const app = require(lib + 'app');
app.listen(PORT, function() {
  console.log(`Express listening on port ${PORT}`);
});
