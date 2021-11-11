const SocketError = (io, socketId, err) => {
    io.to(socketId).emit('error', {error: err.message});
}

const NewMessage = (io, room, message) => {
    io.to(room).emit('new-message', message);
}

const SendAllMessages = (io, socketId, messages) => {
    io.to(socketId).emit('all-messages', messages);
}

const SystemInformation = (io, room, type, message) => {
    io.to(room).emit('system-information', {type, message});
}

module.exports = {
    SocketError,
    NewMessage,
    SendAllMessages,
    SystemInformation
}