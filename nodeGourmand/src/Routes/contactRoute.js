const express=require('express');
const router = express.Router();

const {postContact, getContact}=require('../Controllers/contactController');

router.post('/api/contact', postContact);
router.get('/api/getContact', getContact);

module.exports = router;

