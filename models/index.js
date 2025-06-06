const sequelize = require("../config/db");

const db = {};

db.sequelize = sequelize;

// Models initialization

db.userDetails = require("./users/userDetails.model").initModel(sequelize);
db.userRoles = require("./users/userRoles.model").initModel(sequelize);
db.userAuth = require("./users/userAuth.model").initModel(sequelize);

// Call associate methods for every model
Object.keys(db).forEach((model) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

module.exports = db;
