import users from '../models/users';


class UserController {
  static users(req, res) {
    res.json({
      status: 200,
      data: users,
    });
  }

  static singleUser(req, res) {
    const { id } = req.params;
    const userInfo = users.find(user => parseInt(user.id, 10) === parseInt(id, 10));
    if (userInfo) {
      res.json({
        status: 200,
        data: userInfo,
      });
    } else {
      res
        .json({
          status: 404,
          error: `This user of an id ${id} is not found!`,
        })
        .status(404);
    }
  }
}

export default UserController;
