const express = require('express')
const router = express.Router()
const { resCommentaires, getResComment, tousLesReponse } = require('../Controllers/reponseController')

router.post('/api/resComments/:id', resCommentaires);
router.get('/api/getResComment/:id', getResComment );
router.get('/api/getTousLesReponse', tousLesReponse)

module.exports= router