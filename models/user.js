'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    social_user_id: DataTypes.STRING,
    password: DataTypes.STRING,
    registration_type: DataTypes.ENUM('email', 'google', 'facebook')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};