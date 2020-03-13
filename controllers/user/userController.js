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
    userOperation.getUser(req.body);
  },

  async addUser(req, res, next) {
    const userOperation = new UserOperation();
    const userData = req;

    if (req.file) {
      userData.body.image = req.file.filename;
    }
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
      await userOperation.addUser(userData);
    } catch (error) {
      //handle error
    }
  },
  async updateProfile(req, res, next) {
    const userOperation = new UserOperation();
    const userData = req.body;
    console.log(userData);

    if (req.file) {
      userData.image = req.file.filename;
    }
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
      await userOperation.updateProfile(userData);
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
    userOperation.updateUser(req.body, req.headers.authorization);
  }
};
