const UserRepository = require("../../../repositories/UserRepository");
const UserService = require("../../../services/UserService");


describe("findOneById method", () => {
    const data = {
        id: "id_test",
        email: "email_test",
        hash: "hash_test",
        salt: "salt_test"
    }
    test("method should return user by its id", () => {
        UserRepository.findOneById = jest.fn().mockReturnValue(data)
        expect(UserService.findOneById(data.id)).toEqual(data)
        expect(UserRepository.findOneById).toBeCalledWith(data.id)
    })
})

describe("findOneByEmail method", () => {
    const data = {
        id: "id_test",
        email: "email_test",
        hash: "hash_test",
        salt: "salt_test"
    }
    test("method should return user by its email", () => {
        UserRepository.findOneByEmail = jest.fn().mockReturnValue(data)
        expect(UserService.findOneByEmail(data.email)).toEqual(data)
        expect(UserRepository.findOneByEmail).toBeCalledWith(data.email)
    })
})

describe("create method", () => {
    const data = {
        id: "id_test",
        email: "email_test",
        hash: "hash_test",
        salt: "salt_test"
    }
    test("method should create and return user by its data", () => {
        UserRepository.create = jest.fn().mockReturnValue(data)
        expect(UserService.create(data.email,data.hash,data.salt)).toEqual(data)
        expect(UserRepository.create).toBeCalledWith(data.email,data.hash,data.salt)
    })
})