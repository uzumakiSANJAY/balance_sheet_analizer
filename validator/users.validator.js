const { Joi, celebrate } = require("celebrate");

const userValidation = {
    addUserValidator: celebrate({
        // params: Joi.object({
        //     id: Joi.number().integer().required()
        // }).required(),
        body: Joi.object({
            page: Joi.number().integer().optional()
        })
    }),

};

module.exports = userValidation;