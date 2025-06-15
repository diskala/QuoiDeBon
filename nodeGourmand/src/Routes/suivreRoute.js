const express = require('express')
const router = express.Router();
 
 
const {postSuivre} = require('../Controllers/suivreController');

router.post('/api/suivi/:idRecipe', postSuivre);
 
  

module.exports = router