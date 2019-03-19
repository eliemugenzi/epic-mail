
import jwt from "jsonwebtoken";
import User from "../models/users";
import bcrypt from "bcryptjs";
import Db from "../db";
class AuthController {

  static register(req, res) {
    const {
      firstname,
      lastname,
      email,
      password,
    } = req.body;
    const sql = `SELECT * FROM users WHERE email='${email}'`;
    Db.query(sql).then((result) => {
      console.log(result.rows);
      if (result.rows.length) {
        return res.status(400).json({
          status: 400,
          error: "The user with this email already exists",
        });
      }

      const newUser = [
        firstname,
        lastname,
        email,
        password,
        new Date(),
      ];
      const sql2 = "INSERT INTO users(firstname,lastname,email,password,createdon) VALUES($1,$2,$3,$4,$5) RETURNING *";
      Db.query(sql2, newUser).then((result) => {
        console.log(result.rows);
        jwt.sign({ user: { email, password } }, process.env.SECRET_KEY, (err, token) => {
          res.status(201).json({
            status: 201,
            data: [{ token }],
          });
        });

      });
    })

  }

  static login(req, res) {
    const { email, password } = req.body;
    const credentials = { email, password };

    const sql = `SELECT * FROM users WHERE email='${email}'`;
    Db.query(sql).then((result) => {
      if (result.rows.length) {
        console.log(result.rows[0].password);
        console.log(password);
        if (result.rows[0].password === password) {
          jwt.sign(
            { user: credentials },
            process.env.SECRET_KEY,
            { expiresIn: "2 days" },
            (err, token) => {
              const context = {
                status: 200,
                data: [{ token }],
              };
              res.json(context);
            },
          );
        }
        else {
          res.status(400).json({
            status: 400,
            error: "Incorrect password",
          });
        }
      }
      else {
        res.status(400).json({
          status: 400,
          error: "The user with this email does not exist",
        });
      }
    });
  }
}

export default AuthController;
