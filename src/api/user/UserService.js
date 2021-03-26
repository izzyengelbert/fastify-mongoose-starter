import UserNotFoundError from '../../errors/user/UserNotFoundError';
import { hashPassword } from '../../utils/hashPassword';

export default class UserService {
  constructor(models) {
    this._User = models.User;
  }

  getAllUsers() {
    return this._User.find();
  }

  getUserById(id) {
    return this._findUserById(id);
  }

  getUserByUsername(username) {
    return this._findUserByUsername(username);
  }

  async _findUserByUsername(username) {
    const user = await this._User.findUserByUsername(username);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }

  async _findUserById(userId) {
    const user = await this._User.findUserById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }

  async createUser(payload) {
    const userData = { ...payload };
    userData.password = await hashPassword(payload.password);
    const user = new this._User(userData);

    const result = await user.save();
    return result;
  }
}
