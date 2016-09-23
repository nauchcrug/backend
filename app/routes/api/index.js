const {Router} = require('express');
const router = new Router({
    mergeParams: true
});

const task = require('./task');
const subject = require('./subject');

module.exports = router
  .use('/task', task)
  .use('/subject', subject);
