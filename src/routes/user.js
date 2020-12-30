const express = require('express');
const router = express.Router();
const multer = require('multer');
const validator = require('../middlewares/validator');
const { check, validationResult, body} = require('express-validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
   
  const upload = multer({ storage: storage })

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// Muestra la vista de registro
router.get('/register', guestMiddleware, userController.showRegister);

// Procesa la vista de registro
router.post('/register', guestMiddleware, upload.any(), validator.register, userController.processRegister);

// Muestra la vista de login
router.get('/login', guestMiddleware,  userController.showLogin);

// Procesa la vista de login
router.post('/login', guestMiddleware, userController.processLogin);

// Muestra el perfil del usuario
router.get('/profile', authMiddleware, userController.showProfile);

// Cierra la sesión
router.get('/logout', authMiddleware, userController.logout);

module.exports = router;