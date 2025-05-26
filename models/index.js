const sequelize = require("../config/db");

const db = {};

db.sequelize = sequelize;

// Models initialization

// common

// db.codeLibrary = require("./common/codeLibrary.model")(sequelize);

// Call associate methods for every model
Object.keys(db).forEach((model) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

module.exports = db;
