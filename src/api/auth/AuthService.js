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
    if (!user) throw new IncorrectCredentials();
    const { password: userPassword, ...userData } = user;
    const validPassword = await validatePassword(password, userPassword);
    if (!validPassword) throw new IncorrectCredentials(true);
    const payload = { user: userData };
    const response = {
      token: jwt.sign(payload, config.secret, { expiresIn: '1h' }),
      userId: user.id,
      username: user.username
    };
    return response;
  }
}
