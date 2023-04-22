const db = require("../models/sequelize");
const staff = db.staff;
const { GeneralError } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");
const config = require("../utils/config");
const logger = require("../logger/logger");
const { staffmailSend } = require("../services/mail");

exports.staffregister = async (req, res, next) => {
  try {
    const { name, surname, email, Role } = req.body;
    const data = {
      name,
      surname,
      email,
      Role,
    };
    const addstaff = await staff.create(data);

    if (addstaff) {
      staffmailSend(email, name, surname);
      await next(
        new GeneralResponse("Register successfully", data, config.HTTP_CREATED)
      );
    }
  } catch (err) {
    logger.error(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

exports.findstaff = async (req, res, next) => {
  try {
    const { condition } = req.body;
    const data = await staff.findAll(
      {
        where: condition,
      },
      req.body
    );
    if (data) {
      await next(
        new GeneralResponse("staff Details", data, config.HTTP_SUCCESS)
      );
    } else {
      next(
        new GeneralError("NO DATA FIND....", undefined, config.HTTP_ACCEPTED)
      );
    }
  } catch (err) {
    logger.log(err);
    console.log(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

exports.updatestaff = async (req, res, next) => {
  try {
    const { error } = new staff(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const { name, surname, email, Role } = req.body;
      const data = {
        name,
        surname,
        email,
        Role,
      };
      const updateData = await staff.update(data, {
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

exports.deletestaff = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await staff.findByPk(id);
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
