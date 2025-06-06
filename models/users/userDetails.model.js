const { Model, DataTypes } = require("sequelize");

class UserDetails extends Model {
  static initModel(sequelize) {
    UserDetails.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        middleName: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },
        profileImgId:{
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
        },
        mobileNumber: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null,
        },
        emailId: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        aadharNumber: {
          type: DataTypes.INTEGER,
          allowNull: true,
          unique: true,
          defaultValue: null,
        },
        panNumber: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
          defaultValue: null,
        },
        isActive: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "UserDetails",
        tableName: "tbl_userDetails",
        timestamps: true,
      }
    );
    return UserDetails;
  }

  static associate(models) {
    UserDetails.belongsTo(models.userRoles, {
        foreignKey: "id",
        sourceKey: "roleId",
        as: "userDetails"
    });
    }
}

module.exports = UserDetails;
