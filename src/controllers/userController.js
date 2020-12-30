const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const generateNewId = require('../helpers/generateNewId');
const writeUser = require('../helpers/writeUser');
const path = require('path');
const fs = require('fs');


function getAllUsers(){
    const usersFilePath = path.join(__dirname, '../database/users.json');
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));   
}

module.exports = {
    showRegister: (req, res) => {
        // Do the magic
        return res.render('user/user-register-form');
    },
    processRegister: (req, res) => {
        // Do the magic
        const results = validationResult(req);

        if(!results.isEmpty()) {
            return res.render('user/user-register-form', {
                errors : results.errors,
                old: req.body  
        });
    }
    const user = {
        id: generateNewId(),
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.files[0].filename
    }
        writeUser(user);

        return res.redirect('/user/login');
},

    showLogin: (req, res) => {
       
        return res.render('user/user-login-form');
    },
    processLogin: (req, res) => {
       
        const results = validationResult(req);

        if(!results.isEmpty()) {
            return res.render('user/user-login-form', {
                errors : results.errors,
                old: req.body  
        });
    }

    const foundUser = getAllUsers();
    req.session.user = foundUser;

        if (req.body.remember) {
            res.cookie('user', foundUser.id, { maxAge: 1000 * 60 * 15 });
        }
        return res.redirect('/');
    },

    showProfile: (req, res) => {

        return res.render('user/profile')
    },

    logout: (req, res) => {
       
        req.session.destroy();
        res.clearCookie('user');
        return res.redirect('/user/login');
    }

}