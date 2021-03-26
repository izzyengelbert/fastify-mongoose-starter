import createError from 'http-errors';

const { NotFound } = createError;

export default class UserNotFoundError extends NotFound {
  constructor() {
    super('User not found!');
  }
}
