module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "staff",
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
      Role: {
        type: Sequelize.STRING(50),
        enum: ["Admin", "Assistance", "Helper"],
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
