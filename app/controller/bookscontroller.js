const db = require("../models/sequelize");
const User = db.books;
const { GeneralError } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");
const config = require("../utils/config");
const logger = require("../logger/logger");
const multer = require("../services/multer");

exports.Add_books = async (req, res, next) => {
  try {
    if (!req.file) {
      next(
        new GeneralResponse("IMAGE NOT FOUND", undefined, config.HTTP_ACCEPTED)
      );
    }
    req.body.image = req.file.filename;
    await User.create(req.body);
    await next(
      new GeneralResponse(
        "Book added successfully",
        undefined,
        config.HTTP_CREATED
      )
    );
  } catch (err) {
    logger.error(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

exports.find_books = async (req, res, next) => {
  try {
    const { Title } = req.body;
    let obj = {
      Title,
    };
    if (obj.Title === undefined) {
      delete obj.Title;
    }
    if (Title) {
      const searchResult = await User.findAll({
        where: obj,
      });
      if (searchResult) {
        next(
          new GeneralResponse(
            "Books Data Found..",
            searchResult,
            config.HTTP_SUCCESS
          )
        );
      }
    } else {
      const data = await User.findAll({
        attributes: [
          "id",
          "Title",
          "Author",
          "Topic",
          "Quantity",
          "semester",
          "image",
        ],
      });

      if (data) {
        await next(
          new GeneralResponse("Books Details found", data, config.HTTP_SUCCESS)
        );
      } else {
        next(
          new GeneralError("NO DATA FIND....", undefined, config.HTTP_ACCEPTED)
        );
      }
    }
  } catch (err) {
    logger.log(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

exports.findUserUpdate = async (req, res, next) => {
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
    console.log(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

// Updates the recordes of boooks api

exports.update_books = async (req, res, next) => {
  try {
    // const { Title, Author, Topic, Quantity, semester } = req.body;
    // const data = {
    //   Title,
    //   Author,
    //   Topic,
    //   Quantity,
    //   semester,
    // };
    if (req.file) {
      req.body.image = req.file.filename;
    }
    // req.body.image = req.file.filename;
    const updateData = await User.update(req.body, {
      where: { id: req.params.id },
    });
    const [dataValue] = updateData;
    if (dataValue === 1) {
      await next(
        new GeneralResponse("Data Updated", undefined, config.HTTP_SUCCESS)
      );
    } else {
      logger.error(err);
      next(
        new GeneralError("Data not Updated", undefined, config.HTTP_ACCEPTED)
      );
    }
  } catch (err) {
    logger.error(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

// delete books from database api

exports.delete_books = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findByPk(id);
    if (data) {
      data.destroy(id);
      await next(
        new GeneralResponse("Books Data Deleted...'", config.HTTP_SUCCESS)
      );
    } else {
      next(new GeneralError("Id not Found", undefined, config.HTTP_NOT_FOUND));
    }
  } catch (err) {
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

// search books from the database which is available

exports.searchBooks = async (req, res, next) => {
  try {
    const { Title } = req.body;
    let obj = {
      Title,
    };
    if (obj.Title === undefined) {
      delete obj.Title;
    }
    const searchResult = await User.findAll({
      where: obj,
    }).catch((err) => {
      logger.error("error", err);
      next(new GeneralError("Something Wrong in try's data"));
    });
    if (searchResult) {
      next(
        new GeneralResponse(
          "Books Data Found..",
          searchResult,
          config.HTTP_SUCCESS
        )
      );
    } else {
      next(
        new GeneralResponse("books not Found", undefined, config.HTTP_NOT_FOUND)
      );
    }
  } catch (err) {
    logger.error("err", err);
    next(
      new GeneralError(
        "Something Wrong in catch",
        undefined,
        config.HTTP_ACCEPTED
      )
    );
  }
};
