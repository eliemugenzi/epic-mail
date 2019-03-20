
import Db from "../db";

class Group {
  constructor(_group) {
    this.group = _group;
  }
  
  static create(group) {
    const { name, createdBy } = group;
    const newGroup = [
      name,
      createdBy,
    ];
    
    const sql = "INSERT INTO group(name,createdBy) VALUES($1,$2,$3)";
    Db.query(sql, newGroup);
  }

  static findAll() {
    const sql = "SELECT * FROM groups";
     Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static findOne(id) {
    const sql = `SELECT * FROM groups WHERE id='${id}'`;
     Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static editName({ id, name }) {
    const sql = `UPDATE groups SET name='${name}' WHERE id='${id}'`;
    Db.query(sql);
  }

  static remove(id) {
    const sql = `DELETE FROM groups WHERE id='${id}'`;
    Db.query(sql);
  }

  static addUser({ groupId, memberId }) {
    const user = [
      groupId,
      memberId,
      "member",
    ]
    const sql = "INSERT INTO group_members(groupId,memberId,role) VALUES($1,$2,$3,$4) RETURNING *";
    Db.query(sql, user).catch(err => console.log(err));
  }

  static removeUser({ groupId, memberId }) {
    const sql = `DELETE FROM group_members WHERE id='${groupId}' AND memberId='${memberId}'`;
    Db.query(sql).catch(err => console.log(err));
  }

  static sendMessage({ groupMessage }) {
    const { senderId, groupId, subject, message } = groupMessage;
    const newMessage = [
      senderId,
      groupId,
      subject,
      message,
      "0",
      "sent",
      new Date(),
    ];

    const sql = "INSERT INTO group_messages(senderId,groupId,subject,message,parentMessageId,status,createdOn) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";
    Db.query(sql, newMessage).catch(err => console.log(err));
  }

  static findMembers(id) {
    const sql = `SELECT * FROM group_members WHERE id='${id}'`;
     Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static findMember({ groupId, memberId }) {
    const sql = `SELECT * FROM group_members WHERE groupId='${groupId}' AND memberId='${memberId}'`;
     Db.query(sql).then((result) => {
      return result.rows;
    });
  }
}
export default Group;
