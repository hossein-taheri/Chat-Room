const MAXIMUM_GROUP_USERS_NUMBER = parseInt(process.env.MAXIMUM_GROUP_USERS_NUMBER || 50)

const ChatService = {
    checkAllowedToConnect(io, socket, room) {
        const clients = io.sockets.adapter.rooms.get(room);
        const clientsCount = (clients ? clients.size : 0)

        if (clientsCount >= MAXIMUM_GROUP_USERS_NUMBER)
            throw new Error("Group has been reached to it's maximum users number,try later")
    }
}
module.exports = ChatService;