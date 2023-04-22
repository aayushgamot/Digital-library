module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "admin",
    {
      id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      Password: {
        type: Sequelize.STRING(50),
      },
      username: {
        type: Sequelize.STRING(50),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
