import jwt from 'jsonwebtoken';
import config from '../../../config/index';
import { validatePassword } from '../../utils/hashPassword';
import IncorrectCredentials from '../../errors/user/IncorrectCredentials';

export default class AuthService {
  constructor(models) {
    this._User = models.User;
  }

  async authenticateUser(username, password) {
    const user = await this._User.findUserByCredentials(username);
    const { password: userPassword, ...userData } = user;
    const validPassword = await validatePassword(password, userPassword);
    if (user && validPassword) {
      const payload = { user: userData };
      const response = {
        token: jwt.sign(payload, config.secret, { expiresIn: '1h' }),
        userId: user.id,
        username: user.username
      };
      return response;
    }
    throw new IncorrectCredentials();
  }
}
