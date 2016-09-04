const {Router} = require('express');
const router = new Router;
const {auth, passport} = require('middlewares/auth');
//const needAuth = require(middlewares + 'needAuth');

router.use(auth);

// router.get('/logout', (req, res) => {
//   res.logout();
//   res.redirect('/auth');
// });

//
// router.get('/callback', passport.authenticate('auth0', {
//   failureRedirect: '/'
// }, (req, res) => {
//   res.render('cab/index',{
//         pageTitle: 'Главная',
//         fullname: req.user.name.givenName + ' ' + req.user.name.familyName
//   });
// }));

router.get('/callback', passport.authenticate('auth0', {failureRedirect: '/'}),function (req,res) {
    if (!req.user) {
        throw new Error('user null');
    }else{
    res.redirect('/cab');
    }
})
//router.post('/register', register);
module.exports = router;
