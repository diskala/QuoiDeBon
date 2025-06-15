const express = require("express");
const session = require("express-session");
const nodemailer = require("nodemailer");
require("dotenv").config();
const DB = require("../config/database");
const { where } = require("sequelize");

const postContact = async (req, res) => {
  const { email, phone, firstname, lastname, contenu } = req.body;

  const postContact = await DB.contact.create({
    email,
    phone,
    firstname,
    lastname,
    contenu,
  });

  res.json(postContact)

  // Configurer le transporteur de Nodemailer pour Yahoo SMTP
//   let transporter = nodemailer.createTransport({
//     host: "smtp.mail.yahoo.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL, // Utilisez votre adresse e-mail Yahoo à partir du fichier .env
//       pass: process.env.PASSWORD, // Utilisez votre mot de passe d'application Yahoo à partir du fichier .env
//     },
//   });
let transporter = nodemailer.createTransport({
  service: 'gmail',
//   secure: true, // true pour SSL/TLS
  auth: {
    user: process.env.EMAIL,         // ton adresse Gmail
    pass: process.env.PASSWORD,  // mot de passe d’application
  },
});

  // Configuration de l'e-mail
  let mailOptions = {
    from: process.env.EMAIL, // Utilisez la même adresse e-mail que celle utilisée pour l'authentification
    to: email, // votre adresse e-mail pour recevoir les messages
    subject: "Nouveau message de contact",
    text: `Vous avez reçu un nouveau message de contact de ${firstname} ${lastname} (${email}, ${phone}):\n\n${contenu}`,
  };

  // Envoyer l'e-mail
 transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error("Erreur envoi mail :", err);
    return res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail." });
  } else {
    console.log("Email envoyé :", info.response);
    return res.status(200).json({ message: "Email envoyé avec succès." });
  }
});
};

const getContact = async (req, res) => {
  const mail = await DB.contact.findAll();

  res.json(mail);
};

module.exports = { postContact, getContact };
