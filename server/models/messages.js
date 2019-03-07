import path from "path";
import fs from "fs";
import moment from "moment";

let messages = [];
const messageData = fs.readFileSync(
    path.resolve(__dirname, "../data/messages.json"),
    { encoding: "utf-8" }
);
messages = JSON.parse(messageData);

//export default messages;

class Message {
    constructor({ senderId, receiverId, subject, message, parentMessageId }) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.subject = subject;
        this.message = message;
        this.parentMessageId = parentMessageId || 0;
    }

    static save = ({
        senderId,
        receiverId,
        subject,
        message,
        parentMessageId
    }) => {
        let newMessage = {
            id: messages.length + 1,
            senderId: senderId,
            receiverId: receiverId,
            subject: subject,
            message: message,
            parentMessageId: parentMessageId || 0,
            createdOn: moment().format("LL"),
            status: "sent"
        };
        messages.push(newMessage);

        fs.writeFileSync(
            path.resolve(__dirname, "../data/messages.json"),
            JSON.stringify(messages, null, 2)
        );
        return newMessage;
    };

    static findAll = () => {
        return messages;
    };

    static findById = ({ id }) => {
        let oneMessage = messages.find(
            message => parseInt(message.id) === parseInt(id)
        );
        return oneMessage;
    };

    static findBySender = ({ senderId, id }) => {
        let oneMessage = messages.find(
            message =>
                parseInt(message.senderId) === parseInt(senderId) &&
                parseInt(id) === parseInt(message.id)
        );
        return oneMessage;
    };

    static findAllBySender = ({ senderId }) => {
        let senderMessages = messages.filter(
            message => parseInt(message.senderId) === parseInt(senderId)
        );
        return senderMessages;
    };

    static remove = ({ id, userInfo }) => {
        let newMessages = messages.filter(message => {
            if (
                !(
                    parseInt(message.id) === parseInt(id) &&
                    parseInt(message.senderId) === parseInt(userInfo.id)
                )
            ) {
                return message;
            }
        });

        fs.writeFileSync(
            path.resolve(__dirname, "../data/messages.json"),
            JSON.stringify(newMessages, null, 2)
        );
        return newMessages;
    };

    static moveToDraft = ({ id, userInfo }) => {
        let newMessages = messages.map(message => {
            if (
                parseInt(message.id) === parseInt(id) &&
                parseInt(message.senderId) === parseInt(userInfo.id)
            ) {
                message.status = "draft";
            }
            return message;
        });

        fs.writeFileSync(
            path.resolve(__dirname, "../data/messages.json"),
            JSON.stringify(newMessages, null, 2)
        );
        return newMessages;
    };

    static unread = ({ userInfo }) => {
        let unreadMessages = messages.filter(message => {
            if (
                message.status === "sent" &&
                parseInt(message.receiverId) === parseInt(userInfo.id)
            ) {
                return message;
            }
        });
        return unreadMessages;
    };

    static findAllSent = () => {
        let sentMessages = messages.filter(message => message.status === "sent");
        return sentMessages;
    };

    static findAllSentBySender = ({ senderId }) => {
        let sentMessages = messages.filter(message => {
            if (
                parseInt(message.senderId) === parseInt(senderId) &&
                message.status === "sent"
            ) {
                return message;
            }
        });

        return sentMessages;
    };

    static findAllReceived = ({ receiverId }) => {
        return messages.filter(message => {
            if (parseInt(message.recipientId) === parseInt(receiverId)) {
                return message;
            }
        });
    };
    static updateStatus = ({ id, status }) => {
        let newMessages = messages.map(message => {
            if (parseInt(message.id) == parseInt(id)) {
                message.status = status;
            }
            return message;
        });

        fs.writeFileSync(
            path.resolve(__dirname, "../data/messages.json"),
            JSON.stringify(newMessages, null, 2)
        );
    };

    static draft = ({ userInfo }) => {
        let draftMessages = messages.filter(message => {
            if (
                message.status === "draft" &&
                parseInt(message.senderId) === parseInt(userInfo.id)
            ) {
                return message;
            }
        });
        return draftMessages;
    };
}

export default Message;
