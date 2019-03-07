import path from "path";
import fs from "fs";
import moment from "moment";

let users = [];
const userData = fs.readFileSync(
  path.resolve(__dirname, "../data/users.json"),
  { encoding: "utf-8" }
);

users = JSON.parse(userData);
//export default users;

class User {
  constructor({ firstname, lastname, email, password }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  static save = ({ firstname, lastname, email, password }) => {
    let newUser = {
      id: users.length + 1,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      createdOn: moment().format("LL")
    };

    users.push(newUser);
    fs.writeFileSync(
      path.resolve(__dirname, "../data/users.json"),
      JSON.stringify(users, null, 2)
    );
  };

  static findAll() {
    return users;
  }

  static findById({ id }) {
    let oneUser = users.find(user => parseInt(user.id) === parseInt(id));
    return oneUser;
  }

  static findByEmail({ email }) {
    let oneUser = users.find(user => user.email === email);
    return oneUser;
  }

  static find({ email, password }) {
    return users.find(
      user => user.email === email && user.pasword === password
    );
  }
}

export default User;
