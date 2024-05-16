const express = require('express');
const router = express.Router();
const { login, auth } = require('../Controllers/userController')
const { registerValidation } = require('../Validation/Validation');
 
// const { body, validationResult } = require('express-validator');
//  const validation=require('../Validation/validation')


router.post('/login', login)
router.post('/register', registerValidation, auth)

module.exports = router