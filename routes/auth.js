const router = require('express').Router();

// controller middleware to manage User
const userController = require('../controller/user');

// validation middleware
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');

// to add new user
router.post('/register', registerValidation, userController.registerUser);
router.post('/login', loginValidation, userController.loginUser);

module.exports = router;
