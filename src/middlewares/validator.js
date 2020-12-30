const {body} = require('express-validator');
const path = require('path');
const bcrypt = require('bcryptjs');
const getAllUsers = require('../helpers/getAllUsers');


module.exports = {

    register: [
        body('email')
            .notEmpty()
                .withMessage('El email es obligatorio.')
                .bail()
            .isEmail()
                .withMessage('El email ingresado no es válido.')
                .bail()
            .custom((value, { req }) =>{
                const users = getAllUsers();
                const userFound = users.find(user => user.email == value);

                if(userFound){
                    return false;
                } else {
                    return true;
                }
            })
                .withMessage('El email ingresado ya existe.'),

        body('password')
            .notEmpty()
                .withMessage('La contraseña es obligatoria.')
                .bail()
            .isLength({ min: 6})
                .withMessage('La contraseña debe tener 6 caracteres como mínimo.')
                .bail()
            .custom((value, { req }) => {
                if(req.body.retype){
                    return value == req.body.retype;
                }
                return true;
            })
                .withMessage('Las contraseñas no coinciden'),

        body('retype')
            .notEmpty()
            .withMessage('Debe repetir su contraseña.'),

        body('avatar')
            .custom((value, { req }) => {
                return req.files[0];
            })
                .withMessage('La imagen es obligatoria.')
                .bail()
            .custom((value, { req }) => {
                const avatarName = req.files[0].originalname;
                const format = path.extname(avatarName);

                const okFormat = ['.jpg', '.jpeg', '.png'];
                return okFormat.includes(format);
            })
            .withMessage('Formato de imagen no válido.')   

    ],

    login: [

        body('email')
            .notEmpty()
                .withMessage('El email es obligatorio.')
                .bail()
            .isEmail()
                .withMessage('El email ingresado no es válido.')
                .bail()
            .custom((value, { req }) =>{
                const users = getAllUsers();
                const userFound = users.find(user => user.email == value);
    
                    if(userFound && bcryptjs.compareSync(req.body.password, userFound.password)){
                        return true;
                    } else {
                        return false
                    }
                })
                    .withMessage('El email ingresado no coincide con la contraseña ingresada.')
                    .bail

        
    ]






}