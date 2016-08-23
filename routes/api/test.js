const {Router} = require('express');
const router = new Router;

router.get('/', (req, res) => {
  res.json(req.headers);
});

module.exports = router;
