const express = require('express');
const router = express.Router();
const {PaymentStripe}= require('../Controllers/paymentIntent');

router.post('/create-payment-intent', PaymentStripe);

 
module.exports = router; // ✅ C’est ça qu’il faut