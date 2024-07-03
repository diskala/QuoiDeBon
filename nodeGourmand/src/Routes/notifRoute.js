const express = require('express');
const { getNotifications, markNotificationsAsRead, getNotifReponse, markNotificationsReponseAsRead } = require('../Controllers/notifController');
const router = express.Router();

router.get('/api/notifications', getNotifications);
router.post('/api/notifications/read', markNotificationsAsRead);
router.post('/api/notificationsReponse/read', markNotificationsReponseAsRead);
router.get('/api/notificationsReponse', getNotifReponse);

module.exports = router;