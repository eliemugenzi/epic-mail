import messages from "../models/messages";
import users from "../models/users";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import inbox from "../models/inbox";
import sent from "../models/sent";
import moment from "moment";


class MessageController{
  static userMessages = (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: "Forbidden"

        });
      } else {
        res.json({
          status: 200,
          data: messages
        });
      }
    });
  };

static sentMsg = (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden',
        });
      } else {
        let user = users.find(user => user.email === userData.user.email);
        //let userSent = Message.findAllSentBySender({ senderId: user.id });
        let userSent = messages.filter(
          message => parseInt(message.senderId) === parseInt(user.id)
        );
        res.json({
          status: 200,
          data: userSent,
        });
      }
    });
  };


 static message = (req, res) => {
    let { id } = req.params;
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden',
        });

      } else {
        const userInfo = users.find(user => user.email === userData.user.email);
        const newMessage = messages.filter(message => {
          if (
            parseInt(message.senderId) === parseInt(userInfo.id) &&
            parseInt(id) === parseInt(message.id)
          ) {
            return message;
          }
        });
        if (newMessage) {
          res.json({
            status: 200,
            data: newMessage
          });
        } else {
          res.json({
            status: 404,
            error: '404 Not found',
          });
        }
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
        const userInfo = users.find(user => user.email === userData.user.email);
        const unreadMessages = messages.filter(
          message =>
            message.status === 'sent' &&
            parseInt(message.receiverId) === parseInt(userInfo.id)
        );
        let context = {
          status: 200,
          data: unreadMessages
        };
        res.status(200).json(context);
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
        const userInfo = users.find(user => user.email === userData.user.email);
        const draftMessages = messages.map(message => {
          if (
            parseInt(message.senderId) === parseInt(userInfo.id) &&
            message.status === 'draft'
          ) {
            return message;
          }

        });
        let context = {
          status: 200,
          data: draftMessages
        };
        res.status(200).json(context);
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
        const userInfo = users.find(user => user.email === userData.user.email);
        let { receiverId, subject, message } = req.body;
        const receiverInfo = users.find(
          user => parseInt(user.id) === parseInt(receiverId)
        );
        if (parseInt(userInfo.id) === parseInt(receiverInfo.id)) {
          res.status(400).json({
            status: 400,
            error: 'The sender and recipient must not be the same',
          });
        } else {
          let newSent = {
            senderId: userInfo.id,
            messageId: messages.length + 1
          };
          sent.push(newSent);
          fs.writeFileSync(
            path.resolve(__dirname, '../data/sent.json'),
            JSON.stringify(sent, null, 2)
          );

          let newInbox = {
            receiverId: parseInt(receiverId),
            messageId: messages.length + 1
          };
          inbox.push(newInbox);
          fs.writeFileSync(
            path.resolve(__dirname, '../data/inbox.json'),
            JSON.stringify(inbox, null, 2)
          );


          let newMessage = {
            id: messages.length + 1,
            senderId: userInfo.id,
            receiverId: parseInt(receiverId),
            subject,
            message,
            parentMessageId: 0,
            createdOn: moment().format("LL"),
            status:'sent'
          };


          messages.push(newMessage);
          fs.writeFileSync(path.resolve(__dirname, '../data/messages.json'), JSON.stringify(messages, null, 2));
          res.status(201).json({
            status: 201,
            data: [newMessage]
          });
        }
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
        let userInfo = users.find(user => user.email === userData.user.email);
        let { parentMessageId } = req.params;
        let { subject, message, receiverId } = req.body;
        console.log(userData.user);
        let receiverInfo = users.find(
          user => parseInt(user.id) === parseInt(receiverId)
        );
        console.log(receiverInfo);
        if (parseInt(receiverInfo.id) === parseInt(userInfo.id)) {
          res.status(400).json({
            status: 400,
            error: 'The sender and receiver must not be the same',
          });
        } 
        else if (!receiverInfo){
          res.status(400).json({
            status: 400,
            error: 'Receiver not found',
          });
        }
        else {
          let replyMessageInfo = {
            id: messages.length + 1,
            senderId: userInfo.id,
            receiverId,
            subject,
            message,
            parentMessageId,
            createdOn: moment().format('LL'),
          };
          messages.push(replyMessageInfo);
          fs.writeFileSync(
            path.resolve(__dirname, '../data/messages.json'),
            JSON.stringify(messages, null, 2)
          );
          res.status(201).json({
            status: 201,
            data: [replyMessageInfo]
          });
        }
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
        const userInfo = users.find(user => user.email === userData.user.email);

        let messageById = messages.filter(
          message => parseInt(message.id) === parseInt(messageId)
        );
        if (messageById) {
          let filteredMessages = messages.filter(message => {
            if (
              !(
                parseInt(message.id) === parseInt(messageById.id) &&
                parseInt(messageById.senderId) === parseInt(userInfo.id)
              )
            ) {
              return message;
            }
          });
          res.json({
            status: 200,
            data: filteredMessages
          });
        } else {
          res.status(404).json({
            status: 404,
            error: 'The message you are trying to delete is not found',
          });
        }
      }
    });
  };

 static allRead = (req, res) => {
    let read = messages.filter(message => message.status === 'read');
    res.json({
      status: 200,
      data: read
    });
  };

static allUnread = (req, res) => {
    let unread = messages.filter(message => message.status === 'sent');
    res.json({
      status: 200,
      data: unread
    });
};
  
static allDrafts = (req, res) => {
    let allDrafts = messages.filter(message => message.status === 'draft');
    res.json({
      status: 200,
      data: allDrafts
    });
  };

}
export default MessageController;

