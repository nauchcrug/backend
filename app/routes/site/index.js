const {Router} = require('express');
module.exports = router = new Router;
const exams = require('./exams');

router.get('/', createRender('site/index'));

router.use('/exam', exams);

function createRender(tpl) {
    return (_, res) => res.render(tpl);
}
