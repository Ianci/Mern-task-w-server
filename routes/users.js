//Routes for creating users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const userController = require('../controllers/userController')


//User creation
//Recibe un request del tipo post a esta url /api/users
router.post('/', 
[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'Please add a valid email').isEmail(),
    check("password", 'Please insert your password').not().isEmpty(),
    check("password", 'The password must be at least 8 characters').isLength({ min: 8}),
    check('repeat', 'Please repeat your password').not().isEmpty()
    
],
userController.createUser
);


module.exports = router
