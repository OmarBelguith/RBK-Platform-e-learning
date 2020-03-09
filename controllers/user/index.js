const UserOperation = require('../../operations/user').UserOperation;
module.exports = {
    async login(req, res, next) {
        const userOperation = new UserOperation();
        const {
            SUCCESS,
            ERROR,
            VALIDATION_ERROR,
            NOT_FOUND
        } = userOperation.outputs
        try {
            userOperation.on(SUCCESS, (data) => {
                    return res.json(data)
                })
                .on(ERROR, next)
                .on(VALIDATION_ERROR, next)
                .on(NOT_FOUND, next)
        } catch (error) {
            //handle error
        }
        userOperation.login(req.body)
    },

    async getUser(req, res, next) {
        const userOperation = new UserOperation();
        const {
            SUCCESS,
            ERROR,
            VALIDATION_ERROR,
            NOT_FOUND
        } = userOperation.outputs
        try {
            userOperation.on(SUCCESS, (data) => {
                    return res.json(data)
                })
                .on(ERROR, next)
                .on(VALIDATION_ERROR, next)
                .on(NOT_FOUND, next)
        } catch (error) {
            //handle error
        }
        userOperation.getUser(req.body,req.headers.authorization)
    },

    async addUser(req, res, next) {
        const userOperation = new UserOperation();
        const {
            SUCCESS,
            ERROR,
            VALIDATION_ERROR,
            NOT_FOUND
        } = userOperation.outputs
        try {
            userOperation.on(SUCCESS, (data) => {
                    return res.json(data)
                })
                .on(ERROR, next)
                .on(VALIDATION_ERROR, next)
                .on(NOT_FOUND, next)
        } catch (error) {
            //handle error 
        }
        if(req.file){
            userOperation.addUser(req.body,req.headers.authorization,req.file.filename )
        }
        else
        userOperation.addUser(req.body,req.headers.authorization,'avatar.png' )
    },
    async updateProfile(req, res, next) {
        const userOperation = new UserOperation();
        const {
            SUCCESS,
            ERROR,
            VALIDATION_ERROR,
            NOT_FOUND
        } = userOperation.outputs
        try {
            userOperation.on(SUCCESS, (data) => {
                    return res.json(data)
                })
                .on(ERROR, next)
                .on(VALIDATION_ERROR, next)
                .on(NOT_FOUND, next)
        } catch (error) {
            //handle error
        }
        userOperation.updateProfile(req.body,req.headers.authorization)
    },
    async updateUser(req, res, next) {
        const userOperation = new UserOperation();
        const {
            SUCCESS,
            ERROR,
            VALIDATION_ERROR,
            NOT_FOUND
        } = userOperation.outputs
        try {
            userOperation.on(SUCCESS, (data) => {
                    return res.json(data)
                })
                .on(ERROR, next)
                .on(VALIDATION_ERROR, next)
                .on(NOT_FOUND, next)
        } catch (error) {
            //handle error
        }
        userOperation.updateUser(req.body,req.headers.authorization)
    }
}
