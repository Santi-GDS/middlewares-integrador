const getAllUsers = require('../helpers/getAllUsers');

const logMiddleware = function (req, res, next) {

    if(!req.session.user && req.cookies.user){
        const users = getAllUsers();
        const userFound = users.find(user => user.id == req.cookies.user);
        req.session.user == userFound;

    } 
        return next() 
    }       

module.exports = logMiddleware;