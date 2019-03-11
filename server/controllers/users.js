import users from "../models/users";
import path from "path";
import fs from "fs";

class UserController {
  static users(req, res) {
    res.json({
      status: 200,
      data: users
    });
  }

  static singleUser(req, res) {
    let { id } = req.params;
    let user = users.find(user => parseInt(user.id) === parseInt(id));
    if (user) {
      res.json({
        status: 200,
        data: user
      });
    } else {
      res
        .json({
          status: 404,
          error: `This user of an id ${id} is not found!`
        })
        .status(404);
    }
  }
}

export default UserController;
