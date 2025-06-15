const { body } = require('express-validator');

// Validation des données pour l'inscription
const registerValidation = [
    body('email').isEmail().withMessage("L'adresse e-mail n'est pas valide"),
    body('password')
        .isLength({ min: 8 }).withMessage('Le mot de passe doit faire au moins 8 caractères')
        .matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-])/)
        .withMessage('Le mot de passe doit contenir au moins un chiffre, une majuscule, et un caractère spécial'),
        // .matches('[0-9]').withMessage('Le mot de passe doit contenir au moins un chiffre')
        // .matches('[A-Z]').withMessage('Le mot de passe doit contenir au moins une majuscule')
        // .matches(/[$&+,:;=?@#|'<>.^*()%!-]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial'),
    // Ajoutez d'autres validations selon vos besoins
];

module.exports = {
    registerValidation,
};

 