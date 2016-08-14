require('./lib/globalize');

const {PORT, HOST} = process.env;

const app = require('./lib/app');
app.listen(PORT, HOST, function() {
  console.log(`Express listening on port ${PORT}`);
});
