"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loadAppConfig = () => {
    const NODE_ENV = process.env || {};
    const api_port = parseInt(NODE_ENV.API_PORT, 10);
    const mongodb_url = NODE_ENV.MONGO_URL;
    const mongodb_dbname = NODE_ENV.MONGO_DBNAME;
    const mongodb_secret = NODE_ENV.MONGO_SECRET;
    const redis_port = NODE_ENV.REDIS_PORT;
    const redis_host = NODE_ENV.REDIS_HOST;
    const redis_password = NODE_ENV.REDIS_PASSWORD;
    return {
        api_port,
        mongodb_url,
        mongodb_dbname,
        mongodb_secret,
        redis_port,
        redis_host,
        redis_password,
    };
};
exports.default = loadAppConfig;
//# sourceMappingURL=app.config.js.map