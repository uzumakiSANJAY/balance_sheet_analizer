const validationSchemas = require("../schemas/validationSchemas");

const { error } = validationSchemas.envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`ENV validation error ${error.message}`);
}

const envs = {
  node_env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  serverUrl: process.env.SERVER_BASE_URL,
  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: Number(process.env.JWT_EXPIRY),
  },
  mailOptions: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

module.exports = envs;
