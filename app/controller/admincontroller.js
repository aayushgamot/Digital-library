const db = require("../models/sequelize");
const User = db.admin;
const bcrypt = require("bcrypt");
const { GeneralError } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");
const config = require("../utils/config");
const logger = require("../logger/logger");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      next(
        new GeneralError("Email is not found", undefined, config.HTTP_NOT_FOUND)
      );
    } else {
      const password = req.body.Password;
      const validPassword = await bcrypt.compare(password, user.Password);
      if (validPassword) {
        const JwtToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        next(
          new GeneralResponse(
            "Login successfully....",
            { token: JwtToken },
            config.HTTP_CREATED
          )
        );
      } else {
        next(
          new GeneralError(
            "Password does not match",
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      }
    }
  } catch (err) {
    logger.error(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};
