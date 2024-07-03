const express=require('express')
const router = express.Router()
const {LikeCommentaire, getNombreJaimeComment} = require('../Controllers/postLikeCom')

router.post('/api/postJaimeCom/:id', LikeCommentaire);
router.get('/api/getNombreJaimeComment/:id', getNombreJaimeComment)

module.exports = router