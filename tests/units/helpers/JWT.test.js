const JWT = require("../../../helpers/JWT");
const jsonwebtoken = require("jsonwebtoken");


describe('issueJWT method and verifyJWT method', () => {
    const data = {
        id: 'id_example',
        token: 'token_example'
    };
    test('verifyJWT method should fail if token is invalid', async () => {
        try {
            await JWT.verifyJWT(data.id);
        } catch (err) {
            expect(err.message).toBe("jwt malformed");
        }
    })
})