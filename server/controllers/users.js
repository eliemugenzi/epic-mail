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
  static singleUser(req, res) {
    const { id } = req.params;
    Db.query(`SELECT * FROM users WHERE id='${id}'`).then((result) => {
      if (result.rows.length) {
        res.json({
          status: 200,
          data: result.rows,
        });
      }
      else {
        res.status(404).json({
          status: 404,
          error: `This user of id ${id} is not found`,
        });
      }
    });
  }

}

export default UserController;
