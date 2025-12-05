import * as Joi from 'joi';

export default {
    FIREBASE_PROJECT_ID: Joi.string().required(),
    FIREBASE_DATABASE_ID: Joi.string().optional(),
    GOOGLE_APPLICATION_CREDENTIALS: Joi.string().optional(),
};
