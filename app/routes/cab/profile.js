const {Router} = require('express');
const router = new Router;

router.get('/', (req, res) => {
    return res.render('profile');
});

router.get('/:id', (req, res) => {
    const {id} = req.id;
    res.json({id});
});

module.exports = router;
