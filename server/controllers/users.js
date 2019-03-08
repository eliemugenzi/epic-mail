import User from "../models/users";

class UserController {
  static users(req, res) {
    res.json({
      status: 200,
      data: User.findAll()
    });
  }

  static singleUser(req, res) {
    let { id } = req.params;
    let user = User.findById({ id });
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
