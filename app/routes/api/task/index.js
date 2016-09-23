const {Router} = require('express');
const router = new Router;
const noop = require('app/middlewares/noop');

function get(req, res, next) {
    res.json({
        taskId: req.taskId
    });
}


router.param('id', (req, res, next, name, value) => {
    req.taskId = name;
});

router.route('/:id')
  .get(get)
  .post(noop)
  .put(noop)
  .delete(noop);

module.exports = router;
