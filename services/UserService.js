const UserRepository = require("../repositories/UserRepository");
const UserService = {
    findOneByEmail(email) {
        return UserRepository.findOneByEmail(email);
    },
    create(email, hash, salt) {
        return UserRepository.create(email, hash, salt);
    }
}

module.exports = UserService;