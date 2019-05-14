/**
 * Validation data
 */
const Joi = require('joi')

exports.validation = schema => {
  return (req, res, next) => {
    let data = req.body
    // Validate the data
    Joi.validate(data, schema, (err, value) => {
      if (err) {
        // Send error response
        res.status(422).json({
          message: 'Invalid request data'
        })
      } else {
        next()
        // log value
        console.log(value, 'Value validation')
      }
    })
  }
}

exports.schemaDataValidations = {
  users: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required()
  })
}
