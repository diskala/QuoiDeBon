const express = require('express');
const session = require('express-session');
const DB = require('../config/database');
const { where } = require('sequelize');
const { Op } = require('sequelize'); // Assurez-vous d'importer Op
 
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

 const PaymentStripe= async (req, res) => {
  const { amount, currency = "eur" } = req.body;

  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // en centimes ! ex: 10€ = 1000
      currency: currency || "eur",
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Erreur création PaymentIntent:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {PaymentStripe};
