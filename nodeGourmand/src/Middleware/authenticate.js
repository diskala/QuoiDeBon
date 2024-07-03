const express=require('express')
const session = require('express-session')
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
    }
};

module.exports = authMiddleware;