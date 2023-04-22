const db = require("../models/sequelize");
const User = db.user;
const { GeneralError } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");
const config = require("../utils/config");
const logger = require("../logger/logger");
const { registermailSend } = require("../services/mail");

exports.register = async (req, res, next) => {
  try {
    const { name, surname, email, mobile, gender, dob, address } = req.body;
    const data = {
      name,
      surname,
      email,
      mobile,
      gender,
      dob,
      address,
    };
    const adduser = await User.create(data);

    if (adduser) {
      const sent = await registermailSend(email, name);
      await next(
        new GeneralResponse("Register successfully", data, config.HTTP_CREATED)
      );
    }
  } catch (err) {
    logger.error(err);

    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

exports.finduser = async (req, res, next) => {
  try {
    const { condition } = req.body;
    const data = await User.findAll(
      {
        where: condition,
      },
      req.body
    );
    if (data) {
      await next(
        new GeneralResponse("User Details", data, config.HTTP_SUCCESS)
      );
    } else {
      next(
        new GeneralError("NO DATA FIND....", undefined, config.HTTP_ACCEPTED)
      );
    }
  } catch (err) {
    logger.log(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

exports.updateuser = async (req, res, next) => {
  try {
    const { error } = new User(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const { name, surname, email, mobile, gender, dob, address } = req.body;
      const data = {
        name,
        surname,
        email,
        mobile,
        gender,
        dob,
        address,
      };
      const updateData = await User.update(data, {
        where: { id: req.params.id },
      });
      if (updateData) {
        await next(
          new GeneralResponse("Data Updated", updateData, config.HTTP_SUCCESS)
        );
      } else {
        logger.error(err);
        next(
          new GeneralError("Data not Updated", undefined, config.HTTP_ACCEPTED)
        );
      }
    }
  } catch (err) {
    logger.error(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

// delete the user from database list

exports.deleteuser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findByPk(id);
    if (data) {
      data.destroy(id);
      await next(new GeneralResponse("Data Deleted...'", config.HTTP_SUCCESS));
    } else {
      next(new GeneralError("Id not Found", undefined, config.HTTP_NOT_FOUND));
    }
  } catch (err) {
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};
