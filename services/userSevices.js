const User = require("../models/User");

module.exports = new (class UserService {
  constructor() {
    this.UserModel = User;
  }
  async getUserById(userID) {
    return this.UserModel.findById(userID);
  }
  async getUserByEmail(email) {
    return this.UserModel.findOne({ email });
  }
  async getAllUsers(query) {
    return this.UserModel.find(query);
  }
  async createUser(user) {
    return this.UserModel.create(user);
  }
  async updateUser(id, data) {
    return this.UserModel.findByIdAndUpdate(id, data);
  }
})();
