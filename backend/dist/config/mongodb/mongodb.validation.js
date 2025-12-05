"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.default = {
    MONGODB_URL: Joi.string().required(),
    MONGODB_NAME: Joi.string().min(9).required(),
    MONGODB_SECRET: Joi.string().min(15).required(),
};
//# sourceMappingURL=mongodb.validation.js.map