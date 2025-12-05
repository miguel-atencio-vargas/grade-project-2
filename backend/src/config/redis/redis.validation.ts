import * as Joi from 'joi';

export default {
  CACHE_PORT: Joi.number().required().default(6379),
  CACHE_HOST: Joi.string().required(),
  CACHE_PASSWORD: Joi.string().min(9).required(),
};
