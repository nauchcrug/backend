function NotFound(req,res,next){
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function ErrorHandler(err,req,res,next){
    res.status(err.status || 500)
    req.headers.accept === 'application/json'
        ? res.json({message: err.message})
        : res.render('site/error', {
        errorTitle : err.status,
        errorCode: 'Произошла ошибка. Попробуйте вернуться на главную страницу'
    });
    next();
}

function exporter(){
    return [
        NotFound,
        ErrorHandler
    ];
}

module.exports = exporter;
