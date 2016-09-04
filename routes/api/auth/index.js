const {Router} = require('express');
const router = new Router;
const {auth, passport} = require('middlewares/auth');
//const needAuth = require(middlewares + 'needAuth');

router.use(auth);
router.get('/logout', (req, res) => {
  res.logout();
  res.redirect('/auth');
});

app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
    function(req, res) {
        if (!req.user) {
            throw new Error('user null');
        }
        res.redirect("/cab");
    });

//router.post('/register', register);
module.exports = router;
