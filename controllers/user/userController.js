const UserOperation = require("../../operations/user").UserOperation;
module.exports = {
  async login(req, res, next) {
    const userOperation = new UserOperation();
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = userOperation.outputs;
    try {
      userOperation
        .on(SUCCESS, data => {
          return res.json(data);
        })
        .on(ERROR, next)
        .on(VALIDATION_ERROR, next)
        .on(NOT_FOUND, next);
      await userOperation.login(req.body);
    } catch (error) {}
  },

  async dashboard(req, res, next) {
    const userOperation = new UserOperation();
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = userOperation.outputs;
    try {
      userOperation
        .on(SUCCESS, data => {
          return res.json(data);
        })
        .on(ERROR, next)
        .on(VALIDATION_ERROR, next)
        .on(NOT_FOUND, next);
      await userOperation.dashboard(req.body);
    } catch (error) {}
  },

  async getUser(req, res, next) {
    const userOperation = new UserOperation();
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = userOperation.outputs;
    try {
      userOperation
        .on(SUCCESS, data => {
          return res.json(data);
        })
        .on(ERROR, next)
        .on(VALIDATION_ERROR, next)
        .on(NOT_FOUND, next);
    } catch (error) {
      //handle error
    }
    await userOperation.getUser(req.body);
  },

  async addUser(req, res, next) {
    const userOperation = new UserOperation();
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = userOperation.outputs;
    try {
      userOperation
        .on(SUCCESS, data => {
          return res.json(data);
        })
        .on(ERROR, next)
        .on(VALIDATION_ERROR, next)
        .on(NOT_FOUND, next);
      await userOperation.addUser(req.body, req.file);
    } catch (error) {
      //handle error
    }
  },
  async updateProfile(req, res, next) {
    const userOperation = new UserOperation();
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = userOperation.outputs;
    try {
      userOperation
        .on(SUCCESS, data => {
          return res.json(data);
        })
        .on(ERROR, next)
        .on(VALIDATION_ERROR, next)
        .on(NOT_FOUND, next);
      await userOperation.updateProfile(req.body,req.user.userID,req.file);
    } catch (error) {
      //handle error
    }
  },
  async updateUser(req, res, next) {
    const userOperation = new UserOperation();
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = userOperation.outputs;
    try {
      userOperation
        .on(SUCCESS, data => {
          return res.json(data);
        })
        .on(ERROR, next)
        .on(VALIDATION_ERROR, next)
        .on(NOT_FOUND, next);
    } catch (error) {
      //handle error
    }
    await userOperation.updateUser(req.body,req.file);
  }
};
