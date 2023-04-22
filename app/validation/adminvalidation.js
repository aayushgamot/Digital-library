const Joi = require("@hapi/joi");

module.exports = {
  login: Joi.object({
    email: Joi.string().email().empty().required().label("Email").messages({
      "string.base": `Email should be a type of text`,
      "string.email": `Email format not valid`,
      "string.empty": "Email is not allowed to be empty",
      "string.required": `Email is Required`,
    }),
    Password: Joi.string().empty().required().messages({
      "string.base": `Password should be a type of text`,
      "any.empty": "Password is not allowed to be empty",
      "string.required": `Password is Required`,
      "string.password": `Password format not valid`,
    }),
  }),
};
