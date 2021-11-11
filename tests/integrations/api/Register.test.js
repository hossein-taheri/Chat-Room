const {app, request} = require('../bootstrap')
const UserRepository = require("../../../repositories/UserRepository");
const Password = require("../../../helpers/Password");
const JWT = require("../../../helpers/JWT");

describe("testing-server-routes", () => {
    const data = {
        wrong_email: "email@test",
        wrong_password: "12",
        email: "email@test.com",
        secondEmail: "email2@test.com",
        password: "example_password",
        token: "example_token",
        expiresIn: "example_expiresIn",
    }
    it("POST register should fail with 400 if required data does not exist (email)", async () => {
        const {body} = await request(app).post("/auth/register").send({});
        expect(body.status).toBe(400)
    })
    it("POST register should fail with 400 if required data is not valid (email)", async () => {
        const {body} = await request(app).post("/auth/register").send({email: data.wrong_email});
        expect(body.status).toBe(400)
    })
    it("POST register should fail with 400 if required data does not exist (password)", async () => {
        const {body} = await request(app).post("/auth/register").send({email: data.email});
        expect(body.status).toBe(400)
    })
    it("POST register should fail with 400 if required data is not valid (password)", async () => {
        const {body} = await request(app).post("/auth/register").send({
            email: data.email,
            password: data.wrong_password
        });
        expect(body.status).toBe(400)
    })
    it("POST register should fail with 406 if user already exists", async () => {
        UserRepository.create(data.secondEmail, "hash", "salt")
        const {body} = await request(app).post("/auth/register").send({email: data.secondEmail, password: data.password});
        expect(body.status).toBe(406)
    })
    it("POST login return user ,hash and salt with 200 if email and password is valid and email has not been registered", async () => {
        JWT.issueJWT = jest.fn().mockReturnValue({token: data.token, expiresIn: data.expiresIn})
        const {body} = await request(app).post("/auth/register").send({email: data.email, password: data.password});
        expect(body.status).toBe(200)
        expect(body.data.token).toBe(data.token)
        expect(body.data.expiresIn).toBe(data.expiresIn)
        expect(body.data.user.email).toBe(data.email)
    })
})

