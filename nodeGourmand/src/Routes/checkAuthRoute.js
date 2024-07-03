const express=require('express')
const router = express.Router()
const checkAuth = require('../Controllers/checkAuth')
router.get('/checkAuth', checkAuth)
// router.get('/api/tousDonneesUser', tousDonneesUser)

module.exports=router;