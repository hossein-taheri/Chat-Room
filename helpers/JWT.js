const jsonwebtoken = require('jsonwebtoken');
const privateKEY = process.env.PRIVATE_KEY;
const publicKEY = process.env.PUBLIC_KEY;

const JWT = {
    issueJWT: (id) => {
        const signOptions = {
            expiresIn: "1d",
            algorithm: "RS256",
        };
        const payload = {
            id: id
        };
        const signedToken = jsonwebtoken.sign(payload, privateKEY, signOptions);

        return {
            token: signedToken,
            expiresIn: signOptions.expiresIn,
        }
    },
    verifyJWT: (token) => {
        return new Promise((resolve, reject) => {
            const verifyOptions = {
                expiresIn: "1h",
                algorithm: "RS256"
            };
            jsonwebtoken.verify(token, publicKEY, verifyOptions, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    id: decoded.id
                });
            });
        });
    }
}

module.exports = JWT;