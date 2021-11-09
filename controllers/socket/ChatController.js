const SocketResponse = require("../../helpers/responses/SocketResponse");


const ChatController = (io, socket) => {
    const connectToRoom = async ({}) => {
        try {

            //Send connect-to-room to everyone in the room
            SocketResponse.SystemInformation(io, chatId, 'connected-to-room', {username: socket.user.username})
        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    };

    const disconnect = async ({}) => {
        try {

            //Send disconnect-from-room to everyone in the room
            SocketResponse.SystemInformation(io, chatId, 'disconnected-from-room', {username: socket.user.username})
        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    };

    const getMessages = async ({}) => {
        try {


            SocketResponse.SendAllMessages(io, socket.id, message)
        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    };

    const sendMessage = async ({type, text, file}) => {
        try {


            SocketResponse.NewMessage()
        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    };

    const startTyping = async ({}) => {
        try {


            //Send start-typing to everyone in the room
            SocketResponse.SystemInformation()
        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    }

    const stopTyping = async ({}) => {
        try {

            //Send stop-typing to everyone in the room
            SocketResponse.SystemInformation()
        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    }


    socket.on('connect-to-room', connectToRoom);
    socket.on('disconnect', disconnect);
    socket.on('get-messages', getMessages);
    socket.on('send-message', sendMessage);
    socket.on('start-typing', startTyping);
    socket.on('stop-typing', stopTyping);
};

module.exports = ChatController;