const UserModel = require('../../models').users

class UserController {
  static all(req, res) {
    UserModel.findAll().then(data => {
      res.json({
        data: data,
        total_data: countData(UserModel)
      })
    })
  }

  static getById(req, res) {
    UserModel.findByPk(req.params.id).then(data => {
      res.json({
        data: data
      })
    })
  }

  static store () {}

  static update () {}

  static delete () {}
}

module.exports = UserController
