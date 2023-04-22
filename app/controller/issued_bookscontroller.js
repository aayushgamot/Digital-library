const db = require("../models/sequelize");
const issued_books = db.issued_books;
const { GeneralError } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");
const config = require("../utils/config");
const logger = require("../logger/logger");
const { mailSend } = require("../services/mail");
const { Op } = require("sequelize");
const moment = require("moment");

exports.issued_bookAdd = async (req, res, next) => {
  try {
    const today = moment().format("yyyy-MM-DD");
    const otherday = moment().add(10, "days").format("yyyy-MM-DD");
    const { name, mobile, email, Title, Topic, semester, Quantity } = req.body;
    const data = {
      name,
      mobile,
      email,
      Title,
      Topic,
      semester,
      Quantity,
      issued_Date: today,
      return_Date: otherday,
    };
    const bookData = await issued_books.create(data);

    if (bookData) {
      const sent = await mailSend(
        email,
        name,
        Title,
        Topic,
        Quantity,
        data.return_Date
      );

      await next(
        new GeneralResponse(
          "details Add successfully",
          data,
          config.HTTP_CREATED
        )
      );
    }
  } catch (err) {
    logger.error(err);
    next(
      new GeneralError("Something Wrong", undefined, config.HTTP_BAD_REQUEST)
    );
  }
};
exports.issued_book = async (req, res, next) => {
  try {
    const { condition } = req.body;
    const data = await issued_books.findAll(
      {
        where: condition,
      },
      req.body
    );
    if (data) {
      await next(
        new GeneralResponse("User Details Found", data, config.HTTP_SUCCESS)
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

// update api for issued book details api

exports.update_user = async (req, res, next) => {
  try {
    const { error } = new issued_books(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const { name, mobile, email, Title, Topic, semester, Quantity } =
        req.body;
      const data = {
        name,
        mobile,
        email,
        Title,
        Topic,
        semester,
        Quantity,
      };
      const updateData = await issued_books.update(data, {
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

exports.delete_issued_user = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await issued_books.findByPk(id);
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

exports.viewpanalty = async (req, res, next) => {
  try {
    const panaltydata = await issued_books.findAll({
      where: {
        return_Date: {
          [Op.lt]: new Date(),
        },
      },
    });
    const today = moment().format("yyyy-MM-DD");
    if (panaltydata && panaltydata.length > 0) {
      const data = await panaltydata.map((item) => {
        const obj = moment(today, "yyyy-MM-DD").diff(
          moment(item.return_Date, "yyyy-MM-DD"),
          "days"
        );
        if (today > item.return_Date) {
          let panalty = obj * 10;
          if (obj > 0) {
            panalty;
          }

          return {
            id: item.id,
            name: item.name,
            email: item.email,
            mobile: item.mobile,
            Title: item.Title,
            Topic: item.Topic,
            Quantity: item.Quantity,
            return_Date: item.return_Date,
            obj,
            panalty,
          };
        } else {
        }
      });
      if (data) {
        next(
          new GeneralResponse(
            "penalty added.........",
            data,
            config.HTTP_SUCCESS
          )
        );
      }
    } else {
      next(new GeneralError("data not found", config.HTTP_NOT_FOUND));
    }
  } catch (err) {
    logger.error(err);
    next(new GeneralError("something went wrong", config.HTTP_ACCEPTED));
  }
};
