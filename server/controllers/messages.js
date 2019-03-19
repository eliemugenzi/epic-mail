
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


export default MessageController;

