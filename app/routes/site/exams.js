const {Router} = require('express');
const router = new Router;
//Exam = require('models/exam');
const ApiClient = require('app/old');

router.get('/', (req, res) => {
    res.render('site/allExams'); // List of subjects
});

router.get('/:subjId', (req, res, next) => {
    const {subjId} = req.params;
    ApiClient.subject(subjId)
    .then(data => {
        res.render('site/exam', {
            subject: subjId,
            tasks: data
        });
    })
    .catch(err => next(err));
});

module.exports = router;
