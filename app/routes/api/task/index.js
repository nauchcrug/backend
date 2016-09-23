const {Router} = require('express');
const router = new Router;

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

module.exports = router;
