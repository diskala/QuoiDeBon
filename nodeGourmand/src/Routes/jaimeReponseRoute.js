const express=require('express')
const router = express.Router()
const {postJaimeReponse, getJaimeReponse} = require('../Controllers/jaimeReponse')

router.post('/api/jaimeReponse/:id/:Idcommentaire', postJaimeReponse);
router.get('/api/getJaimeReponse/:id/:Idcommentaire', getJaimeReponse)

module.exports = router