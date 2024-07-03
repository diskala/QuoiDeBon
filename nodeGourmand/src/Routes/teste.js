const express = require('express')
const session = require('express-session')
const sessiontest = require('../Controllers/tes')

const router = express.Router()
 
router.get('/test', sessiontest)

module.exports = router