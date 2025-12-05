import * as Joi from 'joi';

import MONGODB_VALIDATION from './mongodb/mongodb.validation';
import REDIS_VALIDATION from './redis/redis.validation';

export default {
  API_PORT: Joi.number().greater(0).required(),
  ...MONGODB_VALIDATION,
  ...REDIS_VALIDATION,
};
