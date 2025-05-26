const nodemailer = require("nodemailer");
const envs = require("./env");

const configOptions = {
  host: envs.mailOptions.host,
  port: envs.mailOptions.port,
  secure: true,
  auth: {
    user: envs.mailOptions.user,
    pass: envs.mailOptions.pass,
  },
};

const transporter = nodemailer.createTransport(configOptions);

module.exports = transporter;
