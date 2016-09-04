const {Router} = require('express');
const router = new Router;
const {auth, passport} = require('middlewares/auth');


router.use(auth);

router.get('/callback', passport.authenticate('auth0', {failureRedirect: '/'}),function (req,res) {
    if (!req.user) {
        throw new Error('user null');
    }else{
    res.redirect('/cab');
    }
});

router.get('/logout', function (req,res) {
    req.logout();
    res.redirect('/callback');
})
//router.post('/register', register);
module.exports = router;
