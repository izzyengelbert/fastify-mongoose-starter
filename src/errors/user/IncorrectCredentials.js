import createError from 'http-errors';

const { Unauthorized } = createError;

export default class IncorrectCredentials extends Unauthorized {
  constructor(password) {
    let message = 'Username';
    if (password) message = 'Password';
    super(`${message} is incorrect!`);
  }
}
