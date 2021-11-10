const messages = [];

const MessageRepository = {
    create(email, body) {
        const message = {
            metadata: {
                timestamp: +Date.now(),
                sender: {
                    email
                }
            },
            body
        }
        messages.push(message)
        return message;
    },
    findAll() {
        return messages;
    }

}

module.exports = MessageRepository;