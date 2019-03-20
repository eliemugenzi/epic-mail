
import Db from "../db";

class Message {
  constructor(_message) {
    this.message = _message;
  }

  static findAll() {
    const sql = "SELECT FROM messages";
    Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static findOne(id) {
    const sql = `SELECT * FROM messages WHERE id='${id}'`;
     Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static findMine({ userId, messageId }) {
    const sql = `SELECT * FROM messages WHERE senderId='${userId}' AND id='${messageId}'`;

    Db.query(sql).then((result) => {
      return result.rows;
     });
  }

  static remove(id) {
    const sql = `DELETE FROM messages WHERE id='${id}'`;
    Db.query(sql);
  }
  
  static findUnread() {
    const sql = "SELECT * FROM messages WHERE status='sent'";
     Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static findUnreadByMe(id) {
    const sql = `SELECT * FROM messages WHERE status='sent' AND receiverId='${id}'`;
    Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static create(msg) {
    const { senderId, receiverId, subject, message } = msg;
    const newMessage = [
      senderId,
      receiverId,
      subject,
      message,
      "sent",
      new Date(),
    ]
    const sql = "INSERT INTO messages(senderId,receiverId,subject,message,status,createdOn) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    Db.query(sql, newMessage);
  }

  static findDrafts() {
    const sql = "SELECT * FROM messages WHERE status='draft'";
    Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static findDraftsByMe(id) {
    const sql = `SELECT * FROM messages WHERE status='draft' AND senderId='${id}'`;
    Db.query(sql).then((result) => {
      return result.rows;
    });
  }
  
  static reply(msg) {
    const { senderId, receiverId, subject, message, parentMessageId } = msg;
    const newMessage = [
      senderId,
      receiverId,
      subject,
      message,
      parentMessageId,
      "sent",
      new Date(),
    ];
    const sql =
      "INSERT INTO messages(senderId,receiverId,subject,message,parentMessageId,status,createdOn) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
    Db.query(sql, newMessage);
  }

  static findSentByMe(id) {
    const sql = `SELECT * FROM messages WHERE senderId='${id}' AND status='sent'`;
    Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static findRead() {
    const sql = "SELECT * FROM messages WHERE status='read'";
     Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static findReadByMe(id) {
    const sql = `SELECT * FROM messages WHERE status='read' AND receiverId='${id}'`;
     Db.query(sql).then((result) => {
      return result.rows;
    });
  }

  static findAllSent() {
    const sql = "SELECT * FROM messages WHERE status='sent'";
    Db.query(sql).then((result) => {
      return result.rows;
     });
  }

}
export default Message;
