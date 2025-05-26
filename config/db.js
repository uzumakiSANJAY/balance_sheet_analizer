const { Sequelize } = require("sequelize");
const { db, node_env } = require("./env");

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  logging: false,
  // node_env !== "prod"
});

module.exports = sequelize;
