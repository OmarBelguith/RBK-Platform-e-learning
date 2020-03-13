const Operation = require("../operation");
const { UserServices, AuthUtils, ErrorMiddleware } = require("../../services");
const config = require("config");

class UserOperation extends Operation {
  constructor() {
    super();
    this.userService = UserServices;
    this.authUtils = AuthUtils;
    this.errorUtils = ErrorMiddleware.ErrorUtils;
  }

  async login({ email, password }) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        return this.errorUtils.createModelNotFoundError({
          message: "User was not found"
        });
      }
      const comparePassword = await this.authUtils.Bcryptjs.comparePassword(
        user.password,
        password
      );
      if (!comparePassword) {
        return this.errorUtils.createValidationError({
          message: "Wrong Password"
        });
      }
      return this.emit(SUCCESS, {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        image: user.image,
        accessToken: await this.authUtils.AuthJWT.generateToken(user)
      });
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
  async dashboard(req) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      return this.emit(SUCCESS, { req: req, content: "userContent" });
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
  async getUser(query) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      console.log(query);

      const users = await this.userService.getAllUsers(query);
      return this.emit(SUCCESS, {
        users
      });
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
  async addUser(query) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      query.body.password = await this.authUtils.Bcryptjs.hashPassword(
        query.body.password
      );

      if (query.user.role === "onboarder") {
        const Exisiting = await this.userService.getUserByEmail(
          query.body.email
        );
        if (Exisiting) {
          return this.errorUtils.createError({
            details: "",
            code: "400",
            message: "email already existing"
          });
        } else {
          const user = await this.userService.createUser(query.body);
          return this.emit(SUCCESS, {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            image: user.image
          });
        }
      } else {
        return this.errorUtils.createAuthorizationError({
          message: "you are not autherized to add a user"
        });
      }
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
  async updateProfile(userData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      await this.userService.updateUser({ _id: userData.id }, userData);
      const user = await this.userService.getUserById({ _id: userData.id });
      return this.emit(SUCCESS, {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        image: user.image
      });
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
  async updateUser(data, token) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      const tokenget = token.split(" ")[1];
      const user = await this.userService.userServices.findOneUser({
        accessToken: tokenget
      });
      if (user.role === "onboarder") {
        await this.userService.userServices.updateUser(data._id, data);
        const updatedUser = await userService.userServices.findOneUser({
          _id: data._id
        });
        console.log(data);

        return this.emit(SUCCESS, {
          updatedUser
        });
      } else
        return this.emit(SUCCESS, {
          message: "you are not an onboarder"
        });
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
}
UserOperation.setOutputs(["SUCCESS", "ERROR", "VALIDATION_ERROR", "NOT_FOUND"]);
module.exports = UserOperation;
