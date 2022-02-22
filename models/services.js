module.exports = (sequelize, DataTypes) => {
  const service = sequelize.define("service", {
    Title: DataTypes.STRING,
    Description: DataTypes.STRING(1234),
    Budget: DataTypes.INTEGER,
    Image: DataTypes.STRING(),
  });
  return service;
};
