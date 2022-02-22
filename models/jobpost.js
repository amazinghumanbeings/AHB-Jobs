module.exports = (sequelize, DataTypes) => {
  const jobpost = sequelize.define("jobpost", {
    Title: DataTypes.STRING,
    Description: DataTypes.STRING(1234),
    Deliver_date: DataTypes.STRING,
    Budget_price: DataTypes.INTEGER,
    Budget_Period: DataTypes.STRING,
    Catogory: DataTypes.STRING(1234),
    Experience_level: DataTypes.ENUM("Begginer", "Intermediate", "Expert"),
    Location: DataTypes.STRING,
    workmode: DataTypes.ENUM("online", "offline"),
    rating: DataTypes.INTEGER,
    review: DataTypes.STRING(1234),
    Progress: DataTypes.ENUM("Ongoing", "completed", "cancelled"),
  });
  return jobpost;
};
