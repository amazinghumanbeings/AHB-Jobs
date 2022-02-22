module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define("order", {
    requested: DataTypes.DATE,
    accepted: DataTypes.DATE,
    started: DataTypes.DATE,
    completed: DataTypes.DATE,

    Services_ID: DataTypes.STRING,
  });
  return orders;
};
