const Router = require("express").Router();

// user controller
const User = require("../controllers/user.controller");

// middleware validation
const {
    schemaDataValidations,
    validation,
} = require("../middleware/validation");
const isAuthenticated = require("../middleware/token-verify");

// main route
Router.route("/")
    .get(isAuthenticated, User.getAllUser)
    .post(validation(schemaDataValidations.users), User.signUp);
Router.route("/:id")
    .get(isAuthenticated, User.getUserByid)
    .put(isAuthenticated, User.updateUser)
    .delete(isAuthenticated, User.deleteUser);

// auth route
Router.route("/signin").post(User.signIn);

module.exports = Router;
