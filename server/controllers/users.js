import User from "../models/users";
import Db from "../db";

class UserController {
  static users(req, res) {
    Db.query("SELECT * FROM users").then((result) => {
      if (result.rows.length) {
        res.json({
          status: 200,
          data: result.rows,
        });
      }
    })

  }

}

export default UserController;
