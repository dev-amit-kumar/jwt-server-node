const router = require('express').Router();

// controller middleware to manage User
const userController = require('../controller/user');

// validation middleware
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');

// to add new user
router.post('/register', registerValidation, userController.registerUser);

// to login user
router.post('/login', loginValidation, userController.loginUser);

// to get the user details
router.get('/profile', userController.userProfile);

module.exports = router;
