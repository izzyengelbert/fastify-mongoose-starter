import createError from 'http-errors';

const { Unauthorized } = createError;

export default class IncorrectCredentials extends Unauthorized {
  constructor() {
    super('Username or Password is incorrect!');
  }
}
