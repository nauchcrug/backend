const {Router} = require('express');
//const Task = require('app/models/task');
module.exports = router = new Router;

router.get('/task', (req, res) => {
    res.render('cab/task/list');
});

router.get('/task/:id?', (req, res, next) => {
    Task.findById(req.params.id)
        .then(data => {
            res.render('cab/task/show', data);
        })
        .catch(err => next(err));
    }
});
