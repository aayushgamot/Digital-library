const Joi = require("@hapi/joi");

module.exports = {
  //registration validation
  issued_user_register: Joi.object({
    name: Joi.string().min(3).max(30).empty().required().messages({
      "string.base": `Name should be a type of text`,
      "string.min": `Name should be a 3 Character '`,
      "string.max": `Name should be a 30 Character '`,
      "string.empty": "Name is not allowed to be empty",
      "any.required": `Name is Required`,
    }),
    mobile: Joi.number().empty().required().min(10).messages({
      "number.base": `mobile should be a type of text`,
      "number.min": `mobile should be a 10 Character '`,
      "number.empty": "mobile is not allowed to be empty",
      "any.required": `mobile is Required`,
    }),
    email: Joi.string().email().empty().required().label("Email").messages({
      "string.base": `Email should be a type of text`,
      "string.email": `Email format not valid`,
      "string.empty": "Email is not allowed to be empty",
      "string.required": `Email is Required`,
    }),
    Title: Joi.string().empty().required().messages({
      "string.base": `Title should be a type of text`,
      "string.empty": "Title is not allowed to be empty",
      "any.required": `Title is Required`,
    }),
    Topic: Joi.string().empty().empty().required().messages({
      "string.base": `Topic should be a type of text`,
      "string.empty": "Topic is not allowed to be empty",
      "string.required": `Topic is Required`,
    }),
    semester: Joi.number().optional(),
    Quantity: Joi.number().empty().required().min(1).max(1).messages({
      "number.base": `Quantity should be a type of text`,
      "number.min": `you should take only 1 Book at a time'`,
      "number.max": `you should take only 1 Book at a time'`,
      "number.empty": "Quantity is not allowed to be empty",
      "any.required": `Quantity is Required`,
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
    mobile: Joi.number().empty().required().min(10).messages({
      "number.base": `mobile should be a type of text`,
      "number.min": `mobile should be a 10 Character '`,
      "number.empty": "mobile is not allowed to be empty",
      "any.required": `mobile is Required`,
    }),
    email: Joi.string().email().empty().required().label("Email").messages({
      "string.base": `Email should be a type of text`,
      "string.email": `Email format not valid`,
      "string.empty": "Email is not allowed to be empty",
      "string.required": `Email is Required`,
    }),
    Title: Joi.string().empty().required().messages({
      "string.base": `Title should be a type of text`,
      "string.empty": "Title is not allowed to be empty",
      "any.required": `Title is Required`,
    }),
    Topic: Joi.string().empty().empty().required().messages({
      "string.base": `Topic should be a type of text`,
      "string.empty": "Topic is not allowed to be empty",
      "string.required": `Topic is Required`,
    }),
    semester: Joi.number().optional(),
    Quantity: Joi.number().empty().required().min(1).max(5).messages({
      "number.base": `Quantity should be a type of text`,
      "number.min": `you should take only 1 Book at a time'`,
      "number.max": `you should take only 5 Book at a time'`,
      "number.empty": "Quantity is not allowed to be empty",
      "any.required": `Quantity is Required`,
    }),
  }),
  findIssuedBookValidation: Joi.object({
    condition: Joi.object().optional().messages({
      "object.base": `condition should be a type of object`,
      // "object.min": `condition code cannot be a empty field '`,
    }),
  }),
};
