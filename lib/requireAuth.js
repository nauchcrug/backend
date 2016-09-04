module.exports = function (req,res,next) {
    if (!req.isAuthenticated()){
        res.redirect('cab/callback');
    }
    next();
}