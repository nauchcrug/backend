require('./lib/globalize');

const {PORT} = process.env;
const app = require(lib + 'app');
app.listen(PORT, function() {
  console.log(`Express listening on port ${PORT}`);
});
