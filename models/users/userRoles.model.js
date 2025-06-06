const { Model, DataTypes } = require("sequelize");

class UserRoles extends Model {
  static initModel(sequelize) {
    UserRoles.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        roleName: {
          type: DataTypes.ENUM("Admin", "Manager", "Employee"),
          allowNull: false,
        },
        isActive: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "userRoles",
        tableName: "tbl_m_userRoles",
        timestamps: false,
      }
    );
    return UserRoles;
  }
}

module.exports = UserRoles;
