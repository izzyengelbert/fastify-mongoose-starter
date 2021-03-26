import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 12,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2
};

export default {
  get: {
    querystring: Joi.object().keys({
      username: Joi.string().min(12).max(20)
    })
  },
  getById: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  post: {
    body: Joi.object().keys({
      name: Joi.string().max(255).required(),
      username: Joi.string().min(6).max(32).required(),
      email: Joi.string().min(5).max(255).email()
        .required(),
      password: PasswordComplexity(complexityOptions),
      // Force passwords to match
      passwordConfirmation: Joi.any().equal(Joi.ref('password')).required(),
      phoneNumber: Joi.string().min(10).max(12).regex(/^[0-9]+$/)
        .required()
    })
  }
};
