const {Router} = require('express');
const {HttpError} = require('app/lib/errors');
module.exports = router = new Router;

function get(req, res) {
    res.json({
        taskId: req.taskId
    });
}


router.param('taskId', (req, res, next, taskId) => {
    if (!isNaN(taskId))
        return next(new HttpError(500, 'Must be a string'));
    req.taskId = taskId;
    next();
});

router.route('/:taskId')
  .get(get);
