const ChatController = require('../controllers/socket/ChatController');
const auth = require('../middlewares/socket/auth');

module.exports = (http) => {
    const io = require('socket.io')(http, {
        cors: {
            origin: '*'
        },
    });

    io.use(auth);

    io.on('connection', (socket) => {
        console.log('connection initiated with ' + socket.id);

        ChatController(io, socket);
    });
}
