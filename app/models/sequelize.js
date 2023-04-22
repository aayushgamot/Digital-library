const Sequelize = require("sequelize");
const logger = require("../logger/logger");
const dbName = require("../middleWares/database");
const sequelize = new Sequelize(dbName.DB, dbName.USER, dbName.PASSWORD, {
  host: dbName.HOST,
  dialect: dbName.DIALECT,
});

sequelize
  .authenticate()
  .then(() => {
    logger.info("connected to mysql..........");
  })
  .catch((err) => {
    logger.error(err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("./booksmodel")(sequelize, Sequelize);
db.user = require("./usermodel")(sequelize, Sequelize);
db.admin = require("./adminmodel")(sequelize, Sequelize);
db.issued_books = require("./issued_booksmodel")(sequelize, Sequelize);
db.staff = require("./staffmodel")(sequelize, Sequelize);

db.sequelize.sync().then(() => {
  logger.info("yes is sync!!!!!!!!!!!!!");
});

module.exports = db;
