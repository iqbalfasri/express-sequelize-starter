const UserModel = require("../../models").users;

class UserController {
  static async getAllUser(req, res) {
    try {
      // Get and count all data
      const userData = await UserModel.findAndCountAll();

      res.json({
        data: userData,
        message: "success"
      });
    } catch (error) {
      res.status(500).json({
        message: "internal server error"
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
        message: "internal server error"
      });
    }
  }

  static async store(req, res) {
    try {
      let { username, email } = req.body;

      const buildData = await UserModel.build({ username, email });
      const saveData = await buildData.save();

      res.status(201).json({
        data: saveData,
        message: "success"
      });
    } catch (error) {
      res.status(500).json({
        message: "internal server error",
      });
    }
  }

  static async update(req, res) {
    try {
      let { id } = req.params;
      let { username, email } = req.body;

      await UserModel.update({ username, email }, { where: { id }});

      res.json({
        message: "success"
      });
    } catch (error) {
      res.status(500).json({
        message: "internal server error"
      })
    }
  }

  static async delete(req, res) {
    try {
      let { id } = req.params;

      await UserModel.destroy({ where: { id } });

      res.json({
        message: "success"
      });
    } catch (error) {
      res.status(500).json({
        message: "internal server error"
      })
    }
  }
}

module.exports = UserController;
