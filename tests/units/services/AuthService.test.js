const AuthService = require("../../../services/AuthService");
const UserService = require("../../../services/UserService");
const Password = require("../../../helpers/Password");
const JWT = require("../../../helpers/JWT");

describe("register method", () => {
    let data = {
        id: "test_id",
        email: "email@test.com",
        password: "password_test",
        hash: "hash_test",
        salt: "salt_test",
        token: "token_test",
        expiresIn: "expiresIn_test"
    }
    test("registration should fail if email already exists", () => {
        UserService.findOneByEmail = jest.fn().mockReturnValue({email: data.email})
        try {
            AuthService.register(data.email, data.password)
        } catch (err) {
            expect(err.name).toBe("NotAcceptable")
            expect(err.message).toBe("This email address is already being used")
        }
    })
    test("register method should return user and token", () => {
        UserService.findOneByEmail = jest.fn().mockReturnValue(null)
        Password.genPassword = jest.fn().mockReturnValue({
            hash: data.hash,
            salt: data.salt
        })
        UserService.create = jest.fn().mockReturnValue({id: data.id})
        JWT.issueJWT = jest.fn().mockReturnValue({
            token: data.token,
            expiresIn: data.expiresIn
        })

        expect(AuthService.register(data.email, data.password))
            .toEqual({
                user: {
                    id: data.id
                },
                token: data.token,
                expiresIn: data.expiresIn
            })


        expect(UserService.findOneByEmail).toBeCalledWith(data.email)
        expect(Password.genPassword).toBeCalledWith(data.password)
        expect(UserService.create).toBeCalledWith(data.email, data.hash, data.salt)
        expect(JWT.issueJWT).toBeCalledWith(data.id)

    })

})

describe("login method", () => {
    let data = {
        id: "test_id",
        email: "email@test.com",
        password: "password_test",
        hash: "hash_test",
        salt: "salt_test",
        token: "token_test",
        expiresIn: "expiresIn_test"
    }
    test("login method should fail if email does not exist", () => {
        UserService.findOneByEmail = jest.fn().mockReturnValue(null)
        try {
            AuthService.login(data.email, data.password)
        } catch (err) {
            expect(err.name).toBe("NotFound")
            expect(err.message).toBe("This email address has not been registered")
        }
    })
    test("login method should fail if password is not correct", () => {
        UserService.findOneByEmail = jest.fn().mockReturnValue({
            email: data.email
        })
        Password.validPassword = jest.fn().mockReturnValue(false)

        try {
            AuthService.login(data.email, data.password)
        } catch (err) {
            expect(err.name).toBe("Forbidden")
            expect(err.message).toBe("The entered password is not correct")
        }
    })
    test("login method should return token", () => {
        UserService.findOneByEmail = jest.fn().mockReturnValue({
            id: data.id,
            hash: data.hash,
            salt: data.salt,
        })
        Password.validPassword = jest.fn().mockReturnValue(true)
        JWT.issueJWT = jest.fn().mockReturnValue({
            token: data.token,
            expiresIn: data.expiresIn
        })

        expect(AuthService.login(data.email, data.password))
            .toEqual({
                token: data.token,
                expiresIn: data.expiresIn
            })


        expect(UserService.findOneByEmail).toBeCalledWith(data.email)
        expect(Password.validPassword).toBeCalledWith(data.password,data.hash,data.salt)
        expect(JWT.issueJWT).toBeCalledWith(data.id)

    })

})