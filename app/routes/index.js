const site = require('app/routes/site');
const cab = require('app/routes/cab');

/* Apply endpoints */
module.exports = app => app
  .use('/', site)
  .use('/cab', cab);
