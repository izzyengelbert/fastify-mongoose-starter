import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import config from '../../config';

// eslint-disable-next-line func-names
const authenticate = async (req) => {
  const authorizationHeader = req.headers.authorization.split(' ');
  if (authorizationHeader[0] !== 'Bearer') throw new createError.Unauthorized();
  const authToken = authorizationHeader[1];
  const decodedToken = jwt.verify(authToken, config.secret);
  if (!decodedToken.user) {
    throw new Error('Failed to decode token.');
  }
  return decodedToken.user;
};

export default authenticate;
