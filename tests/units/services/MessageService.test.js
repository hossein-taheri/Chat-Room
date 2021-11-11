const MessageRepository = require("../../../repositories/MessageRepository");
const MessageService = require("../../../services/MessageService");


describe("findAll method", () => {
    const data = {
        metadata: {
            timestamp: "timestamp_example",
            sender: {
                email: "email_example"
            },
            body: "body"
        }
    }
    test("method should return all messages", () => {
        MessageRepository.findAll = jest.fn().mockReturnValue(data)
        expect(MessageService.findAll()).toEqual(data)
        expect(MessageRepository.findAll).toBeCalledTimes(1)
    })
})

describe("create method", () => {
    const data = {
        metadata: {
            timestamp: "timestamp_example",
            sender: {
                email: "email_example"
            },
            body: "body"
        }
    }
    test("method should create and return message by its data", () => {
        MessageRepository.create = jest.fn().mockReturnValue(data)
        expect(MessageService.create(data.metadata.sender.email, data.body)).toEqual(data)
        expect(MessageRepository.create).toBeCalledWith(data.metadata.sender.email, data.body)
        expect(MessageRepository.create).toBeCalledTimes(1)
    })
})