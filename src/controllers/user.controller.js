const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../../models").users;

class UserController {
  static async getAllUser(req, res) {
    try {

      const authHeader = req.headers.authorization;

      // Get and count all data
      const userData = await UserModel.findAndCountAll();

      if (authHeader) {
        res.json({
          data: userData,
          message: "success",
        });
      } else {
        res.sendStatus(401)
      }

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
      let { username, email, password } = req.body;

      const bcryptPassword = bcrypt.hashSync(password, 8);

      const buildData = await UserModel.build({ username, email, password: bcryptPassword });
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

  static async auth(req, res) {
    try {
      const { email, password } = req.body;

      let user = await UserModel.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        res.status(404).json({
          message: "user not found"
        })
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password)

      if (!passwordIsValid) {
        res.status(401).json({
          message: "invalid password!"
        })
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'auth-token-key', { algorithm: "HS256"})

      return res.json({
        username: user.username,
        email: user.email,
        token: token
      })

    } catch (error) {
      res.status(500).json({
        message: "internal server error"
      })
    }
  }

  static async verifyToken(req, res) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }

    });
  }
}

module.exports = UserController;
