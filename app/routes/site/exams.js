const {Router} = require('express');
const router = new Router;
//Exam = require('models/exam');
const {getSubject} = require('app/api/client');

router.get('/', (req, res) => {
    res.render('site/allExams'); // List of subjects
});

router.get('/:subjId', (req, res, next) => {
    const {subjId} = req.params;
    ApiClient.getSubject(subjId)
        .then(data => {
            res.render('site/exam', {
                subject: subjId,
                tasks: data
            })
        })
        .catch(err => next(err))
});

module.exports = router;
