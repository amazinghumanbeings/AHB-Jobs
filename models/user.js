module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DoB: DataTypes.INTEGER,
    gender: DataTypes.ENUM("male", "female"),
    email: DataTypes.STRING(255),
    phone: DataTypes.STRING(255),
    profile_photo: DataTypes.STRING(1234),
    skills: DataTypes.STRING(1234),
    Tagline: DataTypes.STRING,
    Experience_Duration: DataTypes.STRING,
    Experience_Level: DataTypes.ENUM("Begginer", "Intermediate", "Expert"),
    Work_Description: DataTypes.STRING(1234),
    Workmode: DataTypes.ENUM("online", "offline", "both"),
    Distance: DataTypes.INTEGER,
    Min_charge: DataTypes.INTEGER,
    Max_charge: DataTypes.INTEGER,
    Location: DataTypes.STRING,
    Organization_name: DataTypes.STRING,
    Organization_Job_role: DataTypes.STRING,
    job_Roll: DataTypes.ENUM("fullTime", "partTime"),
    Overall_rating: DataTypes.STRING,
    referral_code: DataTypes.STRING,
    refered_user: DataTypes.STRING,
    coins: DataTypes.STRING,
  });
  return user;
};
