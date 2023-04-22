module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
      },
      surname: {
        type: Sequelize.STRING(50),
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      mobile: {
        type: Sequelize.STRING(15),
      },
      gender: {
        type: Sequelize.STRING(10),
        enum: ["male", "female", "other"],
      },
      dob: {
        type: Sequelize.DATE,
        timestamps: false,
      },
      address: {
        type: Sequelize.STRING(500),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
