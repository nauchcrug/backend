const {Router} = require('express');
const passport = require('app/passport');
const isAuthenticated = require('app/passport/isAuthenticated');
const upload = require('app/lib/upload');
//const User = require('app/models/user');

const authenticate = passport.authenticate('local', {
    failureRedirect: '/user/login'
});

module.exports = app => app
    .get('/register', (req, res) => res.render('user/register'))
    .post('/register', upload.single('avatar'), postRegister)
    .post('/login', authenticate, postLogin)
    .get('/login', (req, res) => res.render('user/login'))
    .get('/profile', isAuthenticated, getProfile)
    .get('/logout', getLogout)

/* CONTROLLERS */
function getLogout(req, res) {
    res
        .logout()
        .redirect('/')
}

function postLogin(req, res, next) {
    let result = validate(req.body);
    if (result) {
        res.send('<h1>All good</h1>')
    } else {
        next(new AuthEror('login'))
    }
}

function postRegister(req, res, next) {
    let user = new User(req.body);
    user.save()
        .catch(next)
        .then(data => {})
}

function getProfile(req, res) {
    res.render('user/profile', {
        user: req.user
    });
}
