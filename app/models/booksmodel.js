module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "Books",
    {
      Title: {
        type: Sequelize.STRING,
        unique: true,
      },
      Author: {
        type: Sequelize.STRING,
      },
      Topic: {
        type: Sequelize.STRING,
      },
      Quantity: {
        type: Sequelize.STRING,
      },
      semester: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
