const Operation = require('../operation');
const { UserServices, AuthUtils, ErrorMiddleware } = require('../../services');
const config = require('config');

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
          message: 'User was not found'
        });
      }
      const comparePassword = await this.authUtils.Bcryptjs.comparePassword(
        user.password,
        password
      );
      if (!comparePassword) {
        return this.errorUtils.createValidationError({
          message: 'Wrong Password'
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
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
  async dashboard(req) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      return this.emit(SUCCESS, { req: req, content: 'userContent' });
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
  async getUser(req) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      const users = await this.userService.getAllUsers(req);
      return this.emit(SUCCESS, {
        users
      });
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
  async addUser(userData,image) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
        const Exisiting = await this.userService.getUserByEmail(userData.email);
        if (Exisiting) {
          return this.errorUtils.createError({
            details: '',
            code: '400',
            message: 'email already existing'
          });
        } else {
          if (image) {
            userData.image = image.filename;
          }
          userData.password = await this.authUtils.Bcryptjs.hashPassword(userData.password);
          const user = await this.userService.createUser(userData);
          return this.emit(SUCCESS, {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            image: user.image
          });
        }
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
  async updateProfile(userData, userId, image) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      if (image) {
        userData.image = image.filename;
      }
      if(userData.password){
      userData.password = await this.authUtils.Bcryptjs.hashPassword(userData.password);
      }
      await this.userService.updateUser( {_id:userId}, userData);
      const user = await this.userService.getUserById({ _id: userId });
      return this.emit(SUCCESS, {
        message: 'Profile updated successfully',
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        image: user.image
      });
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
  async updateUser(userData, image) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      if (image) {
        userData.image = image.filename;
      }
      if(userData.password){
        userData.password = await this.authUtils.Bcryptjs.hashPassword(userData.password);
        }
       await this.userService.updateUser( {_id:userData.id}, userData);
        const user = await this.userService.getUserById({_id:userData.id });
        return this.emit(SUCCESS, {
          message: `${user.firstname} updated successfully`,
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          image: user.image
        });
      
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
}
UserOperation.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);
module.exports = UserOperation;
