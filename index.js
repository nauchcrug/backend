const {NODE_ENV, PORT, SCALE} = process.env;
global.production = (NODE_ENV === 'production');

const CoffeeScript = require('coffee-script/register');
const app = require('./app.coffee');

app.listen(PORT, function() {
  console.log(`Express listening on port ${PORT}`);
});
