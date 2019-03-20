import Db from "../db";

class User {
    constructor(_user) {
      this.user = _user;
    }

  static findAll() {
    const sql = "SELECT * FROM users";
  
   Db.query(sql).then((result) => {
     return result.rows;
   });

  }

  static findOne(id) {
    const sql = `SELECT * FROM users WHERE id='${id}'`;
    Db.query(sql).then((result) => {
      console.log(result.rows);
      user = result.rows;
      return result.rows;
    });
  }

  static findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email='${email}'`;
    Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static remove(id) {
    const sql = `DELETE FROM users WHERE id='${id}'`;
    Db.query(sql);
  }

  static create(user) {
    const { firstname, lastname, email, password } = user;
    const newUser = [
      firstname,
      lastname,
      email,
      password,
      new Date(),
    ];
    
    const sql = "INSERT INTO users(firstname,lastname,email,password,createdOn) VALUES($1,$2,$3,$4,$5)";
    Db.query(sql, newUser);
  }
}

export default User;
