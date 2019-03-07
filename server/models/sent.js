import path from "path";
import fs from "fs";
import moment from "moment";

let sent = [];

const sentData = fs.readFileSync(path.resolve(__dirname, "../data/sent.json"), {
  encoding: "utf-8"
});
sent = JSON.parse(sentData);

//export default sent;

class Sent {
  constructor({ senderId, messageId }) {
    this.senderId = senderId;
    this.messageId = messageId;
  }

  static save = ({ senderId, messageId }) => {
    let newSent = {
      senderId: senderId,
      messageId: messageId,
      createdOn: moment().format("LL")
    };
    sent.push(newSent);
    fs.writeFileSync(
      path.resolve(__dirname, "../data/sent.json"),
      JSON.stringify(sent, null, 2)
    );
  };

  static findBySender = ({ senderId }) => {
    return sender.filter(s => parseInt(s.senderId) == parseInt(senderId));
  };
}

export default Sent;
