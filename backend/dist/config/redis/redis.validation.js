"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.default = {
    CACHE_PORT: Joi.number().required().default(6379),
    CACHE_HOST: Joi.string().required(),
    CACHE_PASSWORD: Joi.string().min(9).required(),
};
//# sourceMappingURL=redis.validation.js.map