const express=require('express')
const {postLike,countLikes} = require('../Controllers/LikeController')
const router = express.Router()
 

router.post('/api/postLike/:id', postLike)
router.get('/api/countLike/:id', countLikes)
 
 

module.exports=router;