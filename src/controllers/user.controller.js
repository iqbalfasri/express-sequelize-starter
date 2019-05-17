const UserModel = require("../../models").users;

class UserController {
  static async getAllUser(req, res) {
    try {
      const userData = await UserModel.findAndCountAll();

      res.json({
        data: userData,
        message: "success"
      });
    } catch (error) {
      res.status(500).json({
        message: JSON.stringify(error)
      });
    }
  }

  static async getById(req, res) {
    try {
      let { id } = req.params;

      const userById = await UserModel.findByPk(id);

      res.status(200).json({
        data: userById,
        message: "success"
      });
    } catch (error) {
      res.status(500).json({
        message: JSON.stringify(error)
      });
    }
  }

  static async store(req, res) {
    try {
      let { username, email } = req.body;

      let buildData = await UserModel.build({ username, email });
      const saveData = await buildData.save();

      res.status(201).json({
        data: saveData,
        message: "success"
      });
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  }

  static async update(req, res) {
    try {
      let { id } = req.params;

      // const updateUser = await UserModel.update(
      //   { username: req.body.username, email: req.body.email },
      //   { where: { id: id } }
      // );

      return updateUser;
    } catch (error) {
      return error;
    }
  }

  static async delete(req, res) {
    try {
      let { id } = req.params;

      await UserModel.destroy({ where: { id } });

      res.json({
        message: "delete success"
      })

    } catch (error) {
      return error;
    }
  }
}

module.exports = UserController;
