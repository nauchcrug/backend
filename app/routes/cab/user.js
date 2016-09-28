const {Router} = require('express');
const passport = require('app/passport');
const isAuthenticated = require('app/passport/isAuthenticated');
const upload = require('app/lib/upload');
//const User = require('app/models/user');
module.exports = router = new Router;

const authenticate = passport.authenticate('local', {
    failureRedirect: '/auth/login'
});

router
    .get('/login', (req, res) => res.render('user/login'))
    .get('/register', (req, res) => res.render('user/register'))
    .get('/logout', (req, res) => {
        res.logout().redirect('/');
    })

router.post('/register',
    upload.single('avatar'),
    (req, res, next) => {
        let user = new User(req.body);
        user
            .save()
            .catch(next)
            .then(data => {})
    }
);

router.get('/logout', (req, res) => {
    res.logout()
    res.redirect('/');
});



router.get('/profile',
    isAuthenticated,
    (req, res) => {
        res.render('user/profile', {
            user: req.user
        });
    }
);
