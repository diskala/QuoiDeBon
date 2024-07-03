const express = require('express')
const DB = require('../config/database')
 

const allCommentaires= async(req, res)=>{
try{
    const tousLesCommentaires = await DB.comment.findAll({
        include: [{
            model: DB.User,
            // attributes: ['firstname']
        }],
        order: [['createdAt', 'DESC']]
    });
    // console.log("Commentaires récupérées avec succès", tousLesCommentaires);
    res.status(200).json(tousLesCommentaires);
}catch (error){
    console.error("Erreur lors de la récupération des commentaires", error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des commentaires.' });
}
   
}
module.exports = allCommentaires