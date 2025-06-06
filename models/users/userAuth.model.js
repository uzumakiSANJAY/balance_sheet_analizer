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
        emailId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "userAuth",
        tableName: "tbl_userAuth",
        timestamps: false,
      }
    );
    return UserRoles;
  }

  static associate(models) {
    UserRoles.belongsTo(models.userDetails, {
        foreignKey: "userId",
        sourceKey: "id",
        as: "userIds"
    });
    }
}

module.exports = UserRoles;
