const MessageRepository = require("../../../repositories/MessageRepository");

describe("findAll method", () => {
    const data = {
        email: "email_test",
        body: "message_body_test",
        secondEmail: "email_test_2",
        secondBody: "message_body_test_2",
    }
    test("method should return all messages", () => {
        const message = MessageRepository.create(data.email, data.body)
        expect((MessageRepository.findAll())[0]).toEqual({
            metadata: {
                timestamp: message.metadata.timestamp,
                sender: {
                    email: data.email
                }
            },
            body: data.body
        })
        expect((MessageRepository.findAll()).length).toBe(1)
    })
})

describe("create method", () => {
    const data = {
        email: "email_test",
        body: "message_body_test",
        secondEmail: "email_test_2",
        secondBody: "message_body_test_2",
    }
    test("method should return all messages", () => {
        const firstMessage = MessageRepository.create(data.email, data.body)
        const secondMessage = MessageRepository.create(data.secondEmail, data.secondBody)
        expect((MessageRepository.findAll())[1]).toEqual({
            metadata: {
                timestamp: firstMessage.metadata.timestamp,
                sender: {
                    email: data.email
                }
            },
            body: data.body
        })
        expect((MessageRepository.findAll())[2]).toEqual({
            metadata: {
                timestamp: secondMessage.metadata.timestamp,
                sender: {
                    email: data.secondEmail
                }
            },
            body: data.secondBody
        })
        expect((MessageRepository.findAll()).length).toBe(3)
    })
})