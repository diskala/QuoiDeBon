const express=require('express');
const router = express.Router();

const {postContact}=require('../Controllers/contactController');

router.post('/api/contact', postContact);

module.exports = router;

