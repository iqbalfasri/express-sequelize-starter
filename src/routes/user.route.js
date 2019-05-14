const Router = require('express').Router()

// user controller
const { all, getById } = require('../controllers/user.controller')

Router.route('/').get(all).post()
Router.route('/:id').get(getById)

module.exports = Router
