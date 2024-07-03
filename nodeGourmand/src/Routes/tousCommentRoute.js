const express=require('express')
const router = express.Router()

const tousComments = require('../Controllers/getTousCom');

router.get('/api/tousCommentaires', tousComments );

module.exports = router;