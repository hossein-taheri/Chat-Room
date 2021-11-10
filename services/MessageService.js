const MessageRepository = require("../repositories/MessageRepository");
const MessageService = {
    create(email, body){
        return MessageRepository.create(email,body)
    },
    findAll() {
        return MessageRepository.findAll()
    }
}

module.exports = MessageService;