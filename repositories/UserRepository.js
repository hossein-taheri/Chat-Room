const {v4: uuidv4} = require('uuid');


const users = {}

const UserRepository = {
    findOneById(id) {
        for (const email in users) {
            if (users[email].id === id) {
                return users[email];
            }
        }
        return null;
    },
    findOneByEmail(email) {
        return users[email]
    },
    create(email, hash, salt) {
        users[email] = {
            id: uuidv4(),
            email,
            hash,
            salt
        }
        return {
            id: users[email].id,
            email: users[email].email
        }
    }

}

module.exports = UserRepository;