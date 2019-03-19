
import jwt from "jsonwebtoken";
import User from "../models/users";
import bcrypt from "bcryptjs";
import Db from "../db";
class AuthController {

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
