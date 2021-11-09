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
    social_user_id: DataTypes.STRING(255),
    DoB: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    experience: DataTypes.STRING,
    experience_Year: DataTypes.INTEGER,
    work: DataTypes.STRING,
    bio: DataTypes.STRING(1234),
    min_charge: DataTypes.INTEGER,
    max_charge: DataTypes.INTEGER,
    
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};