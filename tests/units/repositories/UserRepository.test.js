const UserRepository = require("../../../repositories/UserRepository");


describe("findOneById method", () => {
    let userData = {
        id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
        email: "email@test.com",
        hash: "hash_test",
        salt: "salt_test"
    };
    test('method should find correct user with its id', () => {
        let user = UserRepository.create(userData.email, userData.hash, userData.salt)

        expect(UserRepository.findOneById(user.id)).toEqual({
            id: user.id,
            email: userData.email,
            hash: userData.hash,
            salt: userData.salt,
        })
    })
    test('method should return null if id does not exist', () => {
        expect(UserRepository.findOneById(userData.id)).toBe(null)
    })
})

describe("findOneByEmail method", () => {
    let userData = {
        email: "email@test.com",
        hash: "hash_test",
        salt: "salt_test"
    };
    test('method should find correct user with its email address', () => {
        let user = UserRepository.create(userData.email, userData.hash, userData.salt)

        expect(UserRepository.findOneByEmail(user.email)).toEqual({
            id: user.id,
            email: userData.email,
            hash: userData.hash,
            salt: userData.salt,
        })
    })
    test('method should return undefined if email address does not exist', () => {
        expect(UserRepository.findOneByEmail("email2@test.com")).toBe(undefined)
    })
})
