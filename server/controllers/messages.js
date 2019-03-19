
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

  
};


export default MessageController;

