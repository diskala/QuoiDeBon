const express = require('express');
const router = express.Router();
const { getApproxRecette  } = require('../Controllers/approxController');
const authenticate = require('../Middleware/authenticate');
 

router.get('/approxRecette', authenticate, getApproxRecette );

module.exports = router;