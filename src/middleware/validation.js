/**
 * Validation data
 */
const Joi = require('joi')

exports.validation = schema => {
  return (req, res, next) => {
    let data = req.body
    // Validate the data
    const { error, value } = Joi.validate(data, schema);
    if (error) {
      res.status(422).json({
        message: error.message,
        status: "Invalid request data"
      });
    } else {
      next();
    }
  }
}

exports.schemaDataValidations = {
  users: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required()
  })
}
