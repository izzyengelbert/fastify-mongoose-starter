import Joi from 'joi';

const authSchema = {
  post: {
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }
};

export default authSchema;
