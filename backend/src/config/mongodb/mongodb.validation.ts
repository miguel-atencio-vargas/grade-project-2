import * as Joi from 'joi';

export default {
  MONGODB_URL: Joi.string().required(),
  MONGODB_NAME: Joi.string().min(9).required(),
  MONGODB_SECRET: Joi.string().min(15).required(),
};
