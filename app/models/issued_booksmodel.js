module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "issued_books",
    {
      id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      Title: {
        type: Sequelize.STRING,
      },
      Topic: {
        type: Sequelize.STRING,
      },
      semester: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Quantity: {
        type: Sequelize.STRING,
      },
      issued_Date: {
        type: Sequelize.STRING,
      },
      return_Date: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
