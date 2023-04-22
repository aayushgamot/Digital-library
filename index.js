const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
require("./app/models/sequelize");
const cors = require("cors");
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: "1000mb",
  })
);
app.use(bodyParser.json());
app.use(express.static("app/uploads"));
app.use("/", require("./app/routes/routes"));
// require("passport");
// require("./app/middleWares/passport");

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", routes);

// then express and cors
app.use(express.json());
// app.use(
//   cors({
//     origin: ["https://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT,PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,a_custom_header"
  ); //notice here carefully

  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const logger = require("./app/logger/logger");
app.use(require("./app/middleWares/response"));
app.use(require("./app/middleWares/error").handleJoiErrors);
app.use(require("./app/middleWares/error").handleErrors);

const port = process.env.PORT || 3030;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
