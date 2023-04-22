const Joi = require("@hapi/joi");
const Moment = require("moment");
const Today = Moment().format("YYYY-MM-DD");

module.exports = {
  //registration validation
  register: Joi.object({
    name: Joi.string().min(3).max(30).empty().required().messages({
      "string.base": `Name should be a type of text`,
      "string.min": `Name should be a 3 Character '`,
      "string.max": `Name should be a 30 Character '`,
      "string.empty": "Name is not allowed to be empty",
      "any.required": `Name is Required`,
    }),
    surname: Joi.string().min(3).max(30).empty().required().messages({
      "string.base": `surname should be a type of text`,
      "string.min": `surname should be a 3 Character '`,
      "string.max": `surname should be a 30 Character '`,
      "string.empty": "surname is not allowed to be empty",
      "any.required": `surname is Required`,
    }),
    email: Joi.string().email().empty().required().label("Email").messages({
      "string.base": `Email should be a type of text`,
      "string.email": `Email format not valid`,
      "string.empty": "Email is not allowed to be empty",
      "string.required": `Email is Required`,
    }),
    mobile: Joi.number().empty().required().min(10).messages({
      "number.base": `mobile should be a type of text`,
      "number.min": `mobile should be a 10 Character '`,
      "number.empty": "mobile is not allowed to be empty",
      "any.required": `mobile is Required`,
    }),
    gender: Joi.string().empty().required().valid("male", "female").messages({
      "string.base": `Gender should be a type of text`,
      "string.empty": "Gender is not allowed to be empty",
      "string.required": `Gender is Required`,
    }),
    dob: Joi.date().required().max(Today).messages({
      "date.empty": `Date of birth cannot be an empty field`,
      "date.base": `Date of birth format not valid`,
      "date.max": `Date of birth of can't be greater then today's date`,
      "date.required": `Date of birth is Required`,
    }),
    address: Joi.string().empty().min(3).max(30).messages({
      "string.base": `address should be a type of text`,
      "string.min": `address should be a 3 Character '`,
      "string.max": `address should be a 30 Character '`,
      "string.empty": "address is not allowed to be empty",
      "any.required": `address is Required`,
    }),
  }),
  updateuser: Joi.object({
    name: Joi.string().min(3).max(30).empty().required().messages({
      "string.base": `Name should be a type of text`,
      "string.min": `Name should be a 3 Character '`,
      "string.max": `Name should be a 30 Character '`,
      "string.empty": "Name is not allowed to be empty",
      "any.required": `Name is Required`,
    }),
    surname: Joi.string().min(3).max(30).empty().required().messages({
      "string.base": `surname should be a type of text`,
      "string.min": `surname should be a 3 Character '`,
      "string.max": `surname should be a 30 Character '`,
      "string.empty": "surname is not allowed to be empty",
      "any.required": `surname is Required`,
    }),
    email: Joi.string().email().empty().required().label("Email").messages({
      "string.base": `Email should be a type of text`,
      "string.email": `Email format not valid`,
      "string.empty": "Email is not allowed to be empty",
      "string.required": `Email is Required`,
    }),
    mobile: Joi.number().empty().required().min(10).messages({
      "number.base": `mobile should be a type of text`,
      "number.min": `mobile should be a 10 Character '`,
      "number.empty": "mobile is not allowed to be empty",
      "any.required": `mobile is Required`,
    }),
    gender: Joi.string().empty().required().valid("male", "female").messages({
      "string.base": `Gender should be a type of text`,
      "string.empty": "Gender is not allowed to be empty",
      "string.required": `Gender is Required`,
    }),
    dob: Joi.date().required().max(Today).messages({
      "date.empty": `Date of birth cannot be an empty field`,
      "date.base": `Date of birth format not valid`,
      "date.max": `Date of birth of can't be greater then today's date`,
      "date.required": `Date of birth is Required`,
    }),
    address: Joi.string().empty().min(3).max(30).messages({
      "string.base": `address should be a type of text`,
      "string.min": `address should be a 3 Character '`,
      "string.max": `address should be a 30 Character '`,
      "string.empty": "address is not allowed to be empty",
      "any.required": `address is Required`,
    }),
  }),
  finduserValidation: Joi.object({
    condition: Joi.object().optional().messages({
      "object.base": `condition should be a type of object`,
      // "object.min": `condition code cannot be a empty field '`,
    }),
  }),
};
