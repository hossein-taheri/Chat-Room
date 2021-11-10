const UserRepository = require("../repositories/UserRepository");
const UserService = {
    findOneById(id){
        return UserRepository.findOneById(id);
    },
    findOneByEmail(email) {
        return UserRepository.findOneByEmail(email);
    },
    create(email, hash, salt) {
        return UserRepository.create(email, hash, salt);
    }
}

module.exports = UserService;