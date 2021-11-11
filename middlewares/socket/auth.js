const JWT = require("../../helpers/JWT");
const SocketResponse = require('../../helpers/responses/SocketResponse');
const UserService = require("../../services/UserService");
const {NotFound} = require("../../helpers/CustomErrors");

module.exports = async (socket, next) => {
    try {
        /* Examples :::

        An Input Data Object must be like :
            socket = {
                auth: {
                    token
                }
            }

        */

        const {id} = await JWT.verifyJWT(socket.handshake.auth.token)
        socket.user = UserService.findOneById(id)


        if (!socket.user) {
            throw new NotFound("User not found");
        }

        next()


    } catch (err) {
        SocketResponse.SocketError(socket, socket.id, err)
        socket.disconnect()
    }
}