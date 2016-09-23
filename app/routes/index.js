const api = require('app/routes/api');
const site = require('app/routes/site');
const cab = require('app/routes/cab');

/* Apply endpoints */
module.exports = app => app
  .use('/', site)
  .use('/api', api)
  .use('/cab', cab);
