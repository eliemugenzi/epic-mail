import path from "path";
import fs from "fs";
import moment from "moment";

let inbox = [];

const inboxData = fs.readFileSync(
  path.resolve(__dirname, "../data/inbox.json"),
  { encoding: "utf-8" }
);
inbox = JSON.parse(inboxData);

//export default inbox;

class Inbox {
  constructor({ receiverId, messageId }) {
    this.receiverId = receiverId;
    this.messsageId = messageId;
  }

  static save({ receiverId, messageId }) {
    let newInbox = {
      receiverId: receiverId,
      messageId: messageId,
      createdOn: moment().format("LL")
    };
    inbox.push(newInbox);

    fs.writeFileSync(
      path.resolve(__dirname, "../data/inbox.json"),
      JSON.stringify(inbox, null, 2)
    );
    return newInbox;
  }

  static findAllByReceiver({ receiverId }) {
    return inbox.filter(
      in_box => parseInt(in_box.receiverId) === parseInt(receiverId)
    );
  }

  static findAll() {
    return inbox;
  }

  static remove({ receiverId }) {
    let newInbox = inbox.filter(in_box => {
      if (parseInt(in_box.receiverId) !== parseInt(receiverId)) {
        return in_box;
      }
    });

    fs.writeFileSync(
      path.resolve(__dirname, "../data/inbox.json"),
      JSON.stringify(newInbox, null, 2)
    );
  }
}

export default Inbox;
