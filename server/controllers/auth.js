import users from "../models/users";
import jwt from "jsonwebtoken";
import validateUser from "../helpers/validations/user";
import path from 'path';
import fs from 'fs';

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
      id: users.length+1
      firstname,
      lastname,
      email,
      password
    };
    users.push(newUser);
    fs.writeFileSync(path.resolve(__dirname, "../data/messages.json"), JSON.stringify(users));
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

    let userData = users.find(user => user.email === email);
    if (userData) {
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
          error: "Invalid email and password combination"
        });
      }
    }
    else {
      res.status(404).json({
        status: 404,
        error:'This user not found'
      })
    }
    
  };

  static users = (req, res) => {
    let context = {
      status: 200,
      data: users
    };
    res.json(context);
  };
  static singleUser = (req, res) => {
    let { id } = req.params;
    let singleUser = users.find(user => parseInt(user.id) === parseInt(id));
    if (singleUser) {
      res.json({
        status: 200,
        data: [singleUser]
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
