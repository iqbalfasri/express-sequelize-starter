const Router = require("express").Router();

// user controller
const User = require("../controllers/user.controller");

// middleware validation
const {
  schemaDataValidations,
  validation
} = require("../middleware/validation");

// main route
Router.route("/")
  .get(User.getAllUser)
  .post(validation(schemaDataValidations.users), User.store);
Router.route("/:id")
  .get(User.getById)
  .put(User.update)
  .delete(User.delete);

module.exports = Router;
