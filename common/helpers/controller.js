const envs = require("../../config/env");
const { logError } = require("./common");

const controller = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (err) {
            next(err);
        }
    };
};

module.exports = { controller };