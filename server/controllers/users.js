import Db from "../db";

class UserController {
  static users(req, res) {
    Db.query("SELECT * FROM users").then(result => {
      if (result.rows.length) {
        res.json({
          status: 200,
          data: result.rows
        });
      }
    });
  }

  static singleUser(req, res) {
    const { id } = req.params;
    Db.query(`SELECT * FROM users WHERE id='${id}'`).then(result => {
      if (result.rows.length) {
        res.json({
          status: 200,
          data: result.rows
        });
      } else {
        res.status(404).json({
          status: 404,
          error: `This user of id ${id} is not found`
        });
      }
    });
  }

  static search(req, res) {
    const { q } = req.query;
    const sql = `SELECT * FROM users WHERE firstname LIKE='%${q}%'`;
    Db.query(sql).then(result => {
      if (result.rows.length) {
        return res.json({
          status: 200,
          data: result.rows
        });
      }

      const sql2 = `SELECT * FROM users WHERE lastname LIKE='%${q}%'`;
      Db.query(sql2).then(result => {
        if (result.rows.length) {
          return res.json({
            status: 200,
            data: result.rows
          });
        }

        res.status(404).json({
          status: 404,
          error: `User called ${q} is not available`
        });
      });
    });
  }
}

export default UserController;
