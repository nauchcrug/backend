const {Router} = require('express');
module.exports = router = new Router;
const ApiClient = require('app/old');

function get(req, res, next) {
    req.subject
    .then(data => res.json({
        subject: req.params.subjId,
        tasks: data
    }))
    .catch(err => next(err));
}

router.param('subjId', (req, res, next, id) => {
    req.subject = ApiClient.subject(id);
    next();
});

router.route('/:subjId')
  .get(get);
