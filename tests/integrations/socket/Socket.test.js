const {createServer} = require("http");
const {Server} = require("socket.io");
const Client = require("socket.io-client");
const auth = require('../../../middlewares/socket/auth')
const ChatController = require("../../../controllers/socket/ChatController");
const JWT = require("../../../helpers/JWT");
const UserService = require("../../../services/UserService");


describe("Socket tests", () => {
    const data = {
        user: {
            id: "example_id",
            email: "example_email"
        },
        body: "example_body"
    }
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        io.use(auth)
        httpServer.listen(() => {
            const port = httpServer.address().port;
            console.log(port)
            JWT.verifyJWT = jest.fn().mockReturnValue({id: data.user.id})
            UserService.findOneById = jest.fn().mockReturnValue(data.user)

            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
                ChatController(io, socket);
            });
            clientSocket.on("connect", done);
        });
    })
    afterAll(() => {
        io.close();
        clientSocket.close();
    });
    test("start typing should be sent", (done) => {
        clientSocket.on('system-information', (data) => {
            expect(data.type === 'start-typing' || data.type === 'stop-typing').toBe(true)
            done()
        })
        clientSocket.emit('start-typing')
    })
    test("start typing should be sent", (done) => {
        clientSocket.on('system-information', (data) => {
            expect(data.type === 'start-typing' || data.type === 'stop-typing').toBe(true)
            done()
        })
        clientSocket.emit('stop-typing')
    })
    test("message should be sent", (done) => {
        clientSocket.on('new-message', (message) => {
            expect(message.metadata.sender.email).toBe(data.user.email)
            expect(message.body).toBe(data.body)
            done()
        })
        clientSocket.emit('send-message', {body: data.body})
    })
})