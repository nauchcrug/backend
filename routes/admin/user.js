var express = require('express');
var router = express.Router();
require('../../lib/app');
const requireAuth = require('../../lib/requireAuth');
const passport = require('passport');


/*
    Чтобы не потеряться в мыслях, читая этот код, для себя и всех опишу, что тут происходит

    Любой вход router.get ещё вызывает модуль requireAuth, он проверяет, авторизован ли юзверь.
    Если нет, то юзверя надо перенаправить на страницу авторизации
    Код будет меняться, если меняем, то просьба подробно прокомментировать ваши правки в комментариях, чтобы можно было адекватно поддерживать код


    Да, просьба до 10 сентября сюда свои фичи не вносить =)
    С уважением, Макс

 */

//Ды, страница авторизации (временно, просто тестируем)


router.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
    function(req, res) {
        if (!req.user) {
            throw new Error('user null');
        }
        res.redirect("/user");
    });

//Страница выхода

router.get('/logout', function(req,res){
   req.logout();
    res.redirect('site/index');
});

router.get('/', requireAuth, function (req,res){
    res.render('cab/user/profile',
        {
            pageTitle: 'Науч.Круг - главная страница',
            fullname: req.user.name.givenName + ' ' + req.user.name.familyName
        });
});



// router.get('/', (req, res) => res.render('cab/user/profile'));

router.get('/login', (req, res) => res.render('cab/user/login'));
router.get('/register', (req, res) => res.render('cab/user/register'));
router.get('/stats', (req, res) => res.render('cab/user/modstat'));

module.exports = router;
