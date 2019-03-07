import Message from "../models/messages";
import User from "../models/users";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import Inbox from "../models/inbox";
import Sent from "../models/sent";
import moment from "moment";

class MessageController {
    static messages(req, res){
        jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
            if (err) {
                res.status(403).json({
                    status: 403,
                    error: "Forbidden"
                });
            } else {
                let messages = Message.findAll();
                if (messages.length) {
                    res.json({
                        status: 200,
                        data: messages
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        error: "No messages yet"
                    });
                }
            }
        });
    };

    static sent(req, res){
        jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
            if (err) {
                res.status(403).json({
                    status: 403,
                    error: "Forbidden"
                });
            } else {
                let user = User.findByEmail({
                    email: userData.user.email
                });
                let userSent = Message.findAllSentBySender({ senderId: user.id });
                if (userSent) {
                    res.json({
                        status: 200,
                        data: userSent
                    });
                } else {
                    res
                        .json({
                            status: 404,
                            error: "No sent messages found!"
                        })
                        .status(404);
                }
            }
        });
    };

    static message(req, res){
        let { id } = req.params;
        jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
            if (err) {
                res.status(403).json({
                    status: 403,
                    error: "Forbidden"
                });
            } else {
                const userInfo = User.findByEmail({
                    email: userData.user.email
                });

                const newMessage = Message.findBySender({
                    senderId: userInfo.id,
                    id
                });
                if (newMessage) {
                    Message.updateStatus({ id: newMessage.id, status: "read" });
                    res.json({
                        status: 200,
                        data: newMessage
                    });
                } else {
                    res.json({
                        status: 404,
                        error: "404 Not found"
                    });
                }
            }
        });
    };

    static unread(req, res){
        jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
            if (err) {
                res.status(403).json({
                    status: 403,
                    error: "Forbidden"
                });
            } else {
                const userInfo = User.findByEmail({ email: userData.user.email });
                const unreadMessages = Message.unread({ userInfo });
                if (unreadMessages.length) {
                    let context = {
                        status: 200,
                        data: unreadMessages
                    };
                    res.status(200).json(context);
                } else {
                    res.status(400).json({
                        status: 400,
                        error: "No unread messages yet!"
                    });
                }
            }
        });
    };

    static draft(req, res){
        jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
            if (err) {
                res.status(403).json({
                    status: 403,
                    error: "Forbidden"
                });
            } else {
                const userInfo = User.findByEmail({ email: userData.user.email });
                const draftMessages = Message.draft({ userInfo });
                if (draftMessages) {
                    let context = {
                        status: 200,
                        data: draftMessages
                    };
                    res.status(200).json(context);
                } else {
                    res.status(400).json({
                        status: 400,
                        error: "No draft messages"
                    });
                }
            }
        });
    };

    static createMessage(req, res){
        jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
            if (err) {
                res.status(403).json({
                    status: 403,
                    error: "Forbidden"
                });
            } else {
                const userInfo = User.findByEmail({ email: userData.user.email });
                let { receiverId, subject, message } = req.body;
                const receiverInfo = User.findById({ id: receiverId });
                if (parseInt(userInfo.id) === parseInt(receiverInfo.id)) {
                    res.status(400).json({
                        status: 400,
                        error: "The sender and recipient must not be the same"
                    });
                } else {
                    Sent.save({
                        senderId: userInfo.id,
                        messageId: Message.findAll().length + 1
                    });
                    Inbox.save({
                        receiverId: parseInt(receiverId),
                        messageId: parseInt(Message.findAll().length + 1)
                    });
                    let response = Message.save({
                        id: Message.findAll().length + 1,
                        senderId: userInfo.id,
                        receiverId: parseInt(receiverId),
                        subject,
                        message,
                        parentMessageId: 0
                    });
                    res.status(201).json({
                        status: 201,
                        data: [response]
                    });
                }
            }
        });
    };

    static replyMessage(req, res){
        jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
            if (err) {
                res.status(403).json({
                    status: 403,
                    error: "Forbidden"
                });
            } else {
                let userInfo = User.findByEmail({ email: userData.user.email });
                let { parentMessageId } = req.params;
                let { subject, message, receiverId } = req.body;
                let receiverInfo = User.findById({ id: receiverId });
                if (parseInt(receiverInfo.id) === parseInt(userInfo.id)) {
                    res.status(400).json({
                        status: 400,
                        error: "The sender and receiver must not be the same"
                    });
                } else {
                    let replyMessageInfo = {
                        id: messages.length + 1,
                        senderId: userInfo.id,
                        receiverId,
                        subject,
                        message,
                        parentMessageId,
                        status: "sent"
                    };

                    let newMessage = Message.save(replyMessageInfo);
                    res.json({
                        status: 201,
                        data: newMessage
                    });
                }
            }
        });
    };

    static moveToTrash(req, res){
        jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
            if (err) {
                res.status(403).json({
                    status: 403,
                    error: "Forbidden"
                });
            } else {
                let { messageId } = req.params;
                const userInfo = User.findByEmail({ email: userData.user.email });

                let messageById = Message.findById({ id: messageId });
                if (messageById) {
                    let filteredMessages = Message.remove({ id: messageId, userInfo });
                    res.json({
                        status: 200,
                        data: filteredMessages
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        error: "The message you're trying to delete is not found"
                    });
                }
            }
        });
    };
    
    static moveToDraft(req, res){
        let { id } = req.params;
        jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
            if (err) {
                res.status(403).json({
                    status: 403,
                    error: "Forbidden"
                });
            } else {
                let userInfo = User.findByEmail({ email: userData.user.email });
                console.log(userInfo);
                let newMessages = Message.moveToDraft({ id, userInfo });
                console.log(newMessages);

                let response = Message.findById({ id });
                res.json({
                    status: 200,
                    data: response
                });
            }
        });
    };
}

export default MessageController;
