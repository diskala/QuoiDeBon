const socketIO = require('socket.io');
const server = require('../app'); // Assurez-vous que c'est le bon fichier où vous avez votre serveur express

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Nouvelle connexion socket établie');

    socket.on('disconnect', () => {
        console.log('Socket déconnectée');
    });
});

module.exports = { io };