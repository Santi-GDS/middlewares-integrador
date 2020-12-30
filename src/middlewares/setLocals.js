const setLocals = function (req, res, next){
    res.locals.loggedUser = false;
    
    if (req.session.user) {
        res.locals.loggedUser = req.session.user;
    }
    return next();
}

module.exports = setLocals;