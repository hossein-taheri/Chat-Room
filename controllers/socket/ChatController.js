const SocketResponse = require("../../helpers/responses/SocketResponse");


const room = 'public-room';

const ChatController = (io, socket) => {
    const connectToRoom = async ({}) => {
        try {

            //Send connect-to-room to everyone in the room
            SocketResponse.SystemInformation(io, room, 'user-connected', {email: socket.user.email})
        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    };

    const disconnect = async ({}) => {
        try {

            //Send disconnect-from-room to everyone in the room
            SocketResponse.SystemInformation()
        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    };

    const getMessages = async ({}) => {
        try {


            SocketResponse.SendAllMessages()
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


    socket.on('disconnect', disconnect);
    socket.on('get-messages', getMessages);
    socket.on('send-message', sendMessage);
    socket.on('start-typing', startTyping);
    socket.on('stop-typing', stopTyping);
    connectToRoom({})
};

module.exports = ChatController;