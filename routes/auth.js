const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const { check } = require('express-validator')
const auth = require('../middlewares/auth')

//api/auth
router.post('/',
authController.authUser
)

router.get('/',
    auth,
    authController.getUser
)

module.exports = router