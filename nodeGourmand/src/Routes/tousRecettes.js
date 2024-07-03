const express = require('express')
const router = express.Router()
const afficheRecettes = require('../Controllers/allRecipes')

router.get('/api/allRecipe', afficheRecettes)

module.exports= router

