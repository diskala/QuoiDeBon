const express=require('express')
const router = express.Router()
const {messagerie, getMessage, getTousMessage} = require('../Controllers/messageController')

router.post('/postMessagerie/:idEnvois/:id', messagerie)
router.get('/api/getMessage/:idEnvois/:id', getMessage)
router.get('/api/getTousMessage', getTousMessage)

module.exports = router

