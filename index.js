const CoffeeScript = require('coffee-script/register');
const globalize = require('./globalize');

const {PORT, SCALE} = process.env;
const app = require('./app');
app.listen(PORT, function() {
  console.log(`Express listening on port ${PORT}`);
});
