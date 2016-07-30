const CoffeeScript = require('coffee-script/register');
const app = require('./app.coffee');

const port = process.env.PORT || 3000
//const scale = process.env.SCALE || 1

app.listen(port, function() {
  console.log(`Express listening on port ${port}`);
});
