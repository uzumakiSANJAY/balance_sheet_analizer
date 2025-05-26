const { Joi, celebrate } = require("celebrate");

const validationSchemas = {
  envVarsSchema: Joi.object()
    .keys({
      PORT: Joi.number().required(),
      DB_USER: Joi.string().required(),
      DB_PASS: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      JWT_SECRET: Joi.string().required().min(15),
      JWT_EXPIRY: Joi.number().required(),
      MAIL_HOST: Joi.string().required(),
      MAIL_PORT: Joi.number().required(),
      MAIL_USER: Joi.string().required(),
      MAIL_PASS: Joi.string().required(),
      SERVER_BASE_URL: Joi.string().required(),
    })
    .unknown(),

  loginSchema: celebrate({
    body: Joi.object({
      userId: Joi.number().integer().required(),
      password: Joi.string().required(),
    }),
  }),

  commonPageSchema: celebrate({
    query: Joi.object({
      page: Joi.number().integer().optional(),
    }),
  }),

  commonParamsSchema: celebrate({
    params: Joi.object({
      id: Joi.number().integer().required(),
    }).required(),
  }),

  commonParamsKeySchema: celebrate({
    params: Joi.object({
      keyId: Joi.number().integer().required(),
    }).required(),
  }),
};

module.exports = validationSchemas;
