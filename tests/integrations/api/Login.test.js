const {request,app} = require('../bootstrap')
const UserRepository = require("../../../repositories/UserRepository");
const Password = require("../../../helpers/Password");
const JWT = require("../../../helpers/JWT");


describe("testing-server-routes", () => {
    const data = {
        wrong_email: "email@test",
        wrong_password: "12",
        email: "email@test.com",
        password: "example_password",
        token: "example_token",
        expiresIn: "example_expiresIn",
    }
    it("POST login should fail with 400 if required data does not exist (email)", async () => {
        const {body} = await request(app).post("/auth/login").send({});
        expect(body.status).toBe(400)
    })
    it("POST login should fail with 400 if required data is not valid (email)", async () => {
        const {body} = await request(app).post("/auth/login").send({email: data.wrong_email});
        expect(body.status).toBe(400)
    })
    it("POST login should fail with 400 if required data does not exist (password)", async () => {
        const {body} = await request(app).post("/auth/login").send({email: data.email});
        expect(body.status).toBe(400)
    })
    it("POST login should fail with 400 if required data is not valid (password)", async () => {
        const {body} = await request(app).post("/auth/login").send({email: data.email, password: data.wrong_password});
        expect(body.status).toBe(400)
    })
    it("POST login should fail with 404 if user does not exist", async () => {
        const {body} = await request(app).post("/auth/login").send({email: data.email, password: data.password});
        expect(body.status).toBe(404)
    })
    it("POST login should fail with 403 if password is not correct", async () => {
        UserRepository.create(data.email, "hash", "salt")
        const {body} = await request(app).post("/auth/login").send({email: data.email, password: data.password});
        expect(body.status).toBe(403)
    })
    it("POST login return token with 200 if email and password is correct", async () => {
        UserRepository.create(data.email, "hash", "salt")
        Password.validPassword = jest.fn().mockReturnValue(true)
        JWT.issueJWT = jest.fn().mockReturnValue({token: data.token, expiresIn: data.expiresIn})
        const {body} = await request(app).post("/auth/login").send({email: data.email, password: data.password});
        expect(body.status).toBe(200)
        expect(body.data).toEqual({
            token: data.token,
            expiresIn: data.expiresIn,
        })
    })
})

