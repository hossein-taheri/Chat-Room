const SocketResponse = require("../../helpers/responses/SocketResponse");
const MessageService = require("../../services/MessageService");
const ChatService = require("../../services/ChatService");

const room = 'public-room';

const ChatController = (io, socket) => {
    const connectToRoom = () => {
        try {

            ChatService.checkAllowedToConnect(io, socket, room);


            socket.join(room)


            //Send user-connected to everyone in the room
            SocketResponse.SystemInformation(io, room, 'user-connected', {
                email: socket.user.email
            })


            //Send all messages to connected user
            SocketResponse.SendAllMessages(io, socket.id, {
                messages: MessageService.findAll()
            })


        } catch (err) {
            SocketResponse.SocketError(io, socket.id, err);
            socket.disconnect();
        }
    };

    const disconnect = async () => {
        try {

            //Send user-disconnected to everyone in the room
            SocketResponse.SystemInformation(io, room, 'user-disconnected', {email: socket.user.email})

        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    };

    const sendMessage = async ({body}) => {
        try {

            const message = MessageService.create(socket.user.email, body)

            //Send message to everyone in room
            SocketResponse.NewMessage(io, room, message)

        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    };

    const startTyping = async () => {
        try {

            //Send start-typing to everyone in the room
            SocketResponse.SystemInformation(io, room, 'start-typing', {email: socket.user.email})

        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    }

    const stopTyping = async () => {
        try {

            //Send stop-typing to everyone in the room
            SocketResponse.SystemInformation(io, room, 'stop-typing', {email: socket.user.email})

        } catch (err) {
            return SocketResponse.SocketError(io, socket.id, err);
        }
    }


    connectToRoom()
    socket.on('disconnect', disconnect);
    socket.on('send-message', sendMessage);
    socket.on('start-typing', startTyping);
    socket.on('stop-typing', stopTyping);
};

module.exports = ChatController;