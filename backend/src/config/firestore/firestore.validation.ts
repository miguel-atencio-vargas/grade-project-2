import Joi from 'joi';

export default {
    FIREBASE_PROJECT_ID: Joi.string().required(),
    GOOGLE_APPLICATION_CREDENTIALS: Joi.string().optional(),
};
