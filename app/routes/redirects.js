const redirects = {
    'old': 'http://informaticege.ru'
}

function createRedirect(path) {
    return function(req, res) {
        res.redirect(path);
    }
}

module.exports = app => {
    Object.keys(redirects).forEach(path => {
        app.use(
                `/${path}`,
                (req, res) => res.redirect(redirects[path])
        );
    });
}
