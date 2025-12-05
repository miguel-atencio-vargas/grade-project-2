import * as Joi from 'joi';

export default {
  API_PORT: Joi.number().greater(0).required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  HOSTNAME: Joi.string().default('localhost'),
};
