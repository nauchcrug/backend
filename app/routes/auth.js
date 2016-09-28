const {Router} = require('express');
const passport = require('app/passport');
const isAuthenticated = require('app/passport/isAuthenticated');
const upload = require('app/lib/upload');
//const User = require('app/models/user');

module.exports = app => app
    //.get('/register', (req, res) => res.render('user/register'))
    //.post('/register', upload.single('avatar'), postRegister)
    //.post('/login', postLogin)
    .get('/login', getLogin)
    .get('/callback', getCallback)
    .get('/logout', getLogout)
    .get('/profile', isAuthenticated, getProfile)

/* CONTROLLERS */
function getLogin(req, res) {
    /*passport.authenticate('auth0', {})(req, res, (req, res) => {
        res.render('user/login');
    });*/
    res.render('user/login');
}

function getCallback(req, res) {
    passport.authenticate('auth0', {
        failureRedirect: '/login',
        failureFlash: false
    })(req, res, (req, res) => {
        res.redirect(req.session.returnTo || '/');
    });
}

function getLogout(req, res) {
    res
        .logout()
        .redirect('/')
}

/*function postLogin(req, res, next) {
    passport.authenticate('auth0', {})(req, res, (req, res) => {
        let result = validate(req.body);
        if (result) {
            res.send('<h1>All good</h1>')
        } else {
            next(new Error('login'))
        }
    });
}*/

/*function postRegister(req, res, next) {
    let user = new User(req.body);
    user.save()
        .catch(next)
        .then(data => {})
}*/

function getProfile(req, res) {
    /*res.render('user/profile', {
        user: req.user
    });*/
    res.json({
        user: req.user
    });
}
