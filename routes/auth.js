const router = require('express').Router();

// controller middleware to manage User
const userController = require('../controller/user');

// validation middleware
const validation = require('../validations/registerValidation');

// to add new user
router.post('/register', validation, userController.registerUser);

module.exports = router;
