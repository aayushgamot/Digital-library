const Joi = require("@hapi/joi");

module.exports = {
  //registration validation
  Add_books: Joi.object({
    Title: Joi.string().empty().required().messages({
      "string.base": `Title should be a type of text`,
      "string.empty": "Title is not allowed to be empty",
      "any.required": `Title is Required`,
    }),
    Author: Joi.string().empty().required().messages({
      "string.base": `Author should be a type of text`,
      "string.empty": "Author is not allowed to be empty",
      "any.required": `Author is Required`,
    }),
    Topic: Joi.string().empty().empty().required().messages({
      "string.base": `Topic should be a type of text`,
      "string.empty": "Topic is not allowed to be empty",
      "string.required": `Topic is Required`,
    }),
    Quantity: Joi.number().empty().required().min(1).max(50).messages({
      "number.base": `Quantity should be a type of number`,
      "number.min": `Quantity should be a 1 Character '`,
      "number.empty": "Quantity is not allowed to be empty",
      "any.required": `Quantity is Required`,
    }),
    semester: Joi.number().optional(),
  }),

  // update books api validation

  update_books: Joi.object({
    Title: Joi.string().empty().required().messages({
      "string.base": `Title should be a type of text`,
      "string.empty": "Title is not allowed to be empty",
      "any.required": `Title is Required`,
    }),
    Author: Joi.string().empty().required().messages({
      "string.base": `Author should be a type of text`,
      "string.empty": "Author is not allowed to be empty",
      "any.required": `Author is Required`,
    }),
    Topic: Joi.string().empty().empty().required().messages({
      "string.base": `Topic should be a type of text`,
      "string.empty": "Topic is not allowed to be empty",
      "string.required": `Topic is Required`,
    }),
    Quantity: Joi.number().empty().required().min(1).max(50).messages({
      "number.base": `Quantity should be a type of number`,
      "number.min": `Quantity should be a 1 Character '`,
      "number.max": `Quantity should be a 15 Character '`,
      "number.empty": "Quantity is not allowed to be empty",
      "any.required": `Quantity is Required`,
    }),
    semester: Joi.number().optional(),
  }),
  search_books: Joi.object({
    Title: Joi.string().required().empty().messages({
      "string.base": `It should be a type of text`,
      "string.empty": "It is not allowed to be empty",
      "any.required": `It is Required`,
    }),
  }),
};
