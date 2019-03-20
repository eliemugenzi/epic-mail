
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import moment from "moment";
import User from "../models/users";
import Message from "../models/messages";
import Db from "../db";

class MessageController {
  static userMessages = (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: "Forbidden"

        });
      } else {

        const sql = "SELECT * FROM messages";
        Db.query(sql).then((result) => {
          res.json({
            status: 200,
            data: result.rows,
          });
        });
      }
    });
  };
}

static message = (req, res) => {
  let { id } = req.params;
  jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
    if (err) {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });

    } else {
      const sql1 = `SELECT * FROM users WHERE email='${userData.user.email}'`;
      Db.query(sql1).then((result) => {
        if (result.rows.length) {
          const sql2 = `SELECT * FROM messages WHERE senderId='${result.rows[0].id}'`;
          Db.query(sql2).then((result) => {
            res.json({
              status: 200,
              data: result.rows,
            });
          });
        }
      });
    }
  });
  
  static sentMsg = (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden',
        });
      } else {
        const sql1 = `SELECT * FROM users WHERE email='${userData.user.email}'`;
        Db.query(sql1).then((result) => {
          if (result.rows.length) {
            const sql2 = `SELECT * FROM messages WHERE senderId='${result.rows[0].id}' AND status='sent'`;
            Db.query(sql2).then((result) => {
              res.json({
                status: 200,
                data: result.rows,
              });
            });
          }
        });
      }
    });
  };

   static unread = (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden',
        });
      } else {
        const sql1 = `SELECT * FROM users WHERE email='${userData.user.email}'`;
        Db.query(sql1).then((result) => {
          if (result.rows.length) {
            const sql2 = `SELECT * FROM messages WHERE receiverId='${result.rows[0].id}' AND status='sent'`;
            Db.query(sql2).then((result) => {
              if (result.rows.length) {
                res.json({
                  status: 200,
                  data: result.rows,
                });
              }
            });
          }
        });
      }
    });
   };
  
  static draft = (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden',
        });
      } else {
        const sql1 = `SELECT * FROM users WHERE email='${userData.user.email}'`;
        Db.query(sql1).then((result) => {
          if (result.rows.length) {
            const sql2 = `SELECT * FROM messages WHERE status='draft' AND senderId='${result.rows[0].id}'`;
            Db.query(sql2).then((result) => {
              res.json({
                status: 200,
                data: result.rows,
              });
            });
          }
        });
      }
    });
  };
static createMessage = (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden',
        });
      } else {
        const { receiverId, subject, message } = req.body;
        const sql1 = `SELECT * FROM users WHERE email='${userData.user.email}'`;
        Db.query(sql1).then((result) => {
          if (result.rows.length) {
            const senderId = result.rows[0].id;
            console.log(senderId);
            if (senderId === parseInt(receiverId, 10)) {
              return res.status(400).json({
                status: 400,
                error: "Are you trying to send it to yourself?",
              });
            }
            const sql2 = `SELECT * FROM users WHERE id='${receiverId}'`;
            Db.query(sql2).then((result) => {
              if (result.rows.length) {
                let newMessage = [
                  senderId,
                  receiverId,
                  subject,
                  message,
                  "sent",
                  new Date()
                ];

                const sql3 = "INSERT INTO messages(senderId,receiverId,subject,message,status,createdOn) VALUES($1,$2,$3,$4,$5,$6)";
                Db.query(sql3, newMessage).then(() => {
                  res.status(201).json({
                    status: 201,
                    success: "Message sent!"
                  });
                });
              }
              else {
                res.status(404).json({
                  status: 404,
                  error: "The receiver is not found",
                });
              }
            });
          }
        });
      }
    });
  };
  
  static replyMessage = (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden',
        });

      } else {
        let { parentMessageId } = req.params;
        let { subject, message, receiverId } = req.body;
        const userSql = `SELECT * FROM users WHERE email='${userData.user.email}'`;
        Db.query(userSql).then((result) => {
          if (result.rows.length) {
            const senderId = result.rows[0].id;
            if (receiverId === result.rows[0].id) {
              res.status(400).json({
                status: 400,
                error: "Oops, are you trying to send it to yourself?",
              });
              return;
            }
            const sql2 = `SELECT * FROM messages WHERE id='${receiverId}'`;
            Db.query(sql2).then((result) => {
              if (result.rows.length) {
                let newMessage = [
                  senderId,
                  receiverId,
                  subject,
                  message,
                  parentMessageId,
                  "sent",
                  new Date(),
                ];
                const sql3 = "INSERT INTO messages(senderId,receiverId,subject,message,parentMessageId,status,createdOn) VALUES($1,$2,$3,$4,$5,$6,$7)";
                Db.query(sql3, newMessage).then(() => {
                  res.status(201).json({
                    status: 201,
                    success: "Replied!"
                  });
                })
              }
              else {
                res.status(400).json({
                  status: 400,
                  error: "The receiver is not found"
                })
              }
            })
          }
        });
      }
    });
  };

  static moveToTrash = (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden',
        });
      } else {
        let { messageId } = req.params;
        const sql1 = `SELECT * FROM users WHERE email='${userData.user.email}'`;
        Db.query(sql1).then((result) => {
          if (result.rows) {
            const sql2 = `SELECT * FROM messages WHERE id='${messageId}' AND senderId='${result.rows[0].id}'`;
            Db.query(sql2).then((result) => {
              if (result.rows.length) {
                const sql3 = `DELETE FROM messages WHERE id=${messageId} AND senderId='${result.rows[0].id}'`;
                Db.query(sql3).then(() => {
                  res.json({
                    status: 200,
                    success: "Deleted successfully",
                  });
                })
              }
              else {
                res.status(404).json({
                  status: 404,
                  error: "The message does not exist or it is not yours",
                });
              }
            })
          }
        });
      }
    });
  };

};


export default MessageController;

