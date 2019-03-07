import User from "../models/users";
import jwt from "jsonwebtoken";
import validateUser from "../helpers/validations/user";

class AuthController {
  static register = (req, res) => {
    let { firstname, lastname, email, password } = req.body;
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }
    let newUser = {
      id: User.findAll().length + 1,
      firstname,
      lastname,
      email,
      password
    };
    User.save(newUser);

    jwt.sign(
      {
        user: newUser
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2 days"
      },
      (err, token) => {
        res.json({
          status: 201,
          data: newUser,
          token
        });
      }
    );
  };

  static login = (req, res) => {
    let { email, password } = req.body;
    let credentials = { email, password };

    let userData = User.findByEmail({ email });
    if (userData.password === password) {
      jwt.sign(
        { user: credentials },
        process.env.SECRET_KEY,
        { expiresIn: "2 days" },
        (err, token) => {
          let context = {
            status: 200,
            token,
            data: credentials
          };
          res.json(context);
        }
      );
    } else {
      res.json({
        status: 404,
        error: "Invalid email and password"
      });
    }
  };

  static users = (req, res) => {
    let users = User.findAll();

    let context = {
      status: 200,
      data: users
    };
    res.json(context);
  };
  static singleUser = (req, res) => {
    let { id } = req.params;
    let singleUser = User.findById({ id });
    if (singleUser) {
      res.json({
        status: 200,
        data: singleUser
      });
    } else {
      res.status(400).json({
        status: 400,
        error: `This user of id ${id} is not found!`
      });
    }
  };
}

export default AuthController;
