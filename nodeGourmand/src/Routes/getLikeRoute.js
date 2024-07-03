const express = require('express')
const router = express.Router()
const controllergetLike = require('../Controllers/getLikeController')

router.get('/api/tousLike', controllergetLike)
module.exports= router