require('./lib/globalize');

const {PORT, HOST} = process.env;

const app = require('./lib/app');
const {createServer} = require('http');

server = createServer(app);
server.listen(PORT, HOST, ev =>
  console.log(`Express listening on port ${HOST}:${PORT}`)
);
server.on('error', (e) => console.log(`Got error: ${e.message}`));
