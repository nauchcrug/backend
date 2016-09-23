module.exports = function (err,req,res,next) {
    if (err) throw err;
    if (!req.isAuthenticated()){
        res.redirect('cab/callback');
    }
    next();
};
