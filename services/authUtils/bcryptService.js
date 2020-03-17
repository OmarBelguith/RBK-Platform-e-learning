const bcrypt = require('bcryptjs');

module.exports = new class BcryptService {
    constructor(){
    }
    async hashPassword(password){
        return bcrypt.hash(password, 10)
    }
    async comparePassword (password, newPassword){
        return bcrypt.compare(newPassword, password);
    }
}