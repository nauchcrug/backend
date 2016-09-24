const {Router} = require('express');
const {getSubject} = require('app/api/client');

module.exports = router = new Router;

function get(req, res, next) {
    req.getSubject
    .then(data => res.json({
        subject: req.subject.subjId,
        tasks: data,
        test: 123
    }))
    .catch(err => next(err))
}

router.param('subjId', (req, res, next, subjId) => {
    req.getSubject = getSubject(subjId)
    req.getSubject.subjId = subjId
    next()
})

router.route('/:subjId')
  .get(get)
