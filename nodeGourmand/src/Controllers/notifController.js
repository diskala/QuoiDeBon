const { where, Model } = require('sequelize');
const DB = require('../config/database');
const { model } = require('mongoose');


const getNotifications = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Utilisateur non authentifié' });
    }

    try {
       
        const notifications = await DB.notifModel.findAll({
            where: { userId, viewed: false },
            include: [{
                model: DB.comment,
                include: [
                    { model: DB.User, attributes: ['firstname'] }, // Utilisateur qui a écrit le commentaire
                    {
                        model: DB.recette,
                        include: [{ model: DB.User, attributes: ['firstname'] }] // Utilisateur qui a créé la recette
                    }
                ]
            }]
        });
         
        const nombreNotif = await DB.notifModel.count({where:{
            userId,
            viewed: false
        }});
 
        // const notificationsWithUser = notifications.map(notification => ({
        //     ...notification.get({ plain: true }),
        //     user: notification.comment ? notification.comment.User.firstname : null
        //   }));
        // res.json({nombreNotif: nombreNotif, notifications: notifications });
        // const notificationsCont = await DB.notifModel.count({ where: { userId, viewed: false },})

        res.json({notifications, nombreNotif});
    } catch (error) {
        console.error('Erreur lors de la récupération des notifications:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération des notifications', error });
    }
};

const markNotificationsAsRead = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Utilisateur non authentifié' });
    }

    try {
       
        await DB.notifModel.update({ viewed: true }, { where: { userId, viewed: false } });
        res.json({ success: true, message: 'Notifications marquées comme lues' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour des notifications:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour des notifications', error });
    }
};




const getNotifReponse = async(req, res)=>{
       
    try {
        const userId = req.session.userId;
    
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Utilisateur non authentifié' });
        }
    
        const tousNotifReponse = await DB.notifReponse.findAll({
            where: { userId, viewed: false },
            include: [{
                model: DB.reponseModel,
                include: [
                    { model: DB.User, attributes: ['firstname'] },
                    {
                        model: DB.comment,
                        include: [{ model: DB.User, attributes: ['firstname'] }]
                    }
                ]
            }]
        });
    
        const nombreNotifReponse = await DB.notifReponse.count({
            where: {
                userId, viewed: false
            }
        });
    
        res.json({ tousNotifReponse, nombreNotifReponse });
    
    } catch (error) {
        console.error('Erreur lors de la récupération des notifications de réponses sur les commentaires:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération des notifications de réponse', error });
    }



}

const markNotificationsReponseAsRead = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Utilisateur non authentifié' });
    }

    try {
      
        await DB.notifReponse.update({ viewed: true }, { where: { userId, viewed: false } });
        res.json({ success: true, message: 'Notifications des reponses commentaires marquées comme lues' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour des notifications reponses:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour des notifications de reponses', error });
    }
};

module.exports = {
    getNotifications,
    markNotificationsAsRead,
    markNotificationsReponseAsRead,
    getNotifReponse
};