const express = require('express')
const {lesComentes, getCommentaire} = require('../Controllers/commentController')
const router = express.Router()


router.post('/api/commentaires/:id', lesComentes );
router.get('/api/getcomment/:id', getCommentaire);
 

module.exports = router;
