"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const mongodb_validation_1 = require("./mongodb/mongodb.validation");
const redis_validation_1 = require("./redis/redis.validation");
exports.default = {
    API_PORT: Joi.number().greater(0).required(),
    ...mongodb_validation_1.default,
    ...redis_validation_1.default,
};
//# sourceMappingURL=app.validation.js.map