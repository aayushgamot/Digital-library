const Joi = require("@hapi/joi");
const Moment = require("moment");
const Today = Moment().format("YYYY-MM-DD");

module.exports = {
  addstaff: Joi.object({
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
    Role: Joi.string()
      .empty()
      .required()
      .valid("Admin", "Assistance", "Helper")
      .messages({
        "string.base": `Role should be a type of text`,
        "string.empty": "Role is not allowed to be empty",
        "string.required": `Role is Required`,
      }),
  }),
  updatestaff: Joi.object({
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
    Role: Joi.string()
      .empty()
      .required()
      .valid("Admin", "Assistance", "Helper")
      .messages({
        "string.base": `Role should be a type of text`,
        "string.empty": "Role is not allowed to be empty",
        "string.required": `Role is Required`,
      }),
  }),

  findstaffValidation: Joi.object({
    condition: Joi.object().optional().messages({
      "object.base": `condition should be a type of object`,
      // "object.min": `condition code cannot be a empty field '`,
    }),
  }),
};
