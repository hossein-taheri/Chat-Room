const SocketError = (io, socketId, err) => {
    console.log(err.message);
    io.to(socketId).emit('error', {error: err.message});
}

const NewMessage = (io, room, message) => {
    console.log(message);
    io.to(room).emit('new-message', {message});
}

const SendAllMessages = (io, room, messages) => {
    console.log(messages);
    io.to(room).emit('all-messages', {messages});
}

const SystemInformation = (io, room, type, message) => {
    console.log({
        type,
        message
    });
    io.to(room).emit('system-information', {type, message});
}

module.exports = {
    SocketError,
    NewMessage,
    SendAllMessages,
    SystemInformation
}