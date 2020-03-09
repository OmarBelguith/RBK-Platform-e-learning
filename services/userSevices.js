const User = require('../models/User')
const jwt = require('jsonwebtoken');
const config = require('config')
const bcrypt = require('bcryptjs')
module.exports = {
    async getUsers(query) {

        try {
            const users = await User.find(query)
            return users;
        } catch (e) {
            // Log Errors
            throw Error(e)
        }
    },

    async addUser(data) {

        try {
            const user = await new User(data);
            
            
            user.password = await bcrypt.hash(user.password, 8)
            user.accessToken = jwt.sign({
                    userID: user._id
                },
                process.env.SECRET || config.SECRET, {
                    expiresIn: "1d"
                });
            await user.save()
            return user;
        } catch (e) {
            // Log Errors
            throw Error(e)
        }
    },

    async findOneUser(data) {

        try {
            const user = await User.findOne(data)
            return user;
        } catch (e) {
            // Log Errors
            throw Error(e)
        }
    },

    async updateUser(id, data) {

        try {
           await User.findByIdAndUpdate(id, data);
        } catch (e) {
            // Log Errors
            throw Error(e)
        }
    }
   

}