const Password = require("../helpers/Password");
const UserService = require("./UserService");
const JWT = require("../helpers/JWT");
const {NotFound, NotAcceptable, Forbidden} = require("../helpers/CustomErrors");

const AuthService = {
    register(email, password) {
        const user = UserService.findOneByEmail(email)

        if (user) {
            throw new NotAcceptable("This email address is already being used")
        }

        const {hash, salt} = Password.genPassword(password)

        return UserService.create(email, hash, salt);
    },
    login(email, password) {
        const user = UserService.findOneByEmail(email)

        if (!user) {
            throw new NotFound("This email address has not been registered")
        }

        const isPasswordValid = Password.validPassword(password, user.hash, user.salt)

        if (!isPasswordValid) {
            throw new Forbidden("The entered password is not correct")
        }

        return JWT.issueJWT(user.id);
    },
}

module.exports = AuthService