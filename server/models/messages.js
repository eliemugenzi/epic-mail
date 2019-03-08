import path from "path";
import fs from "fs";
import moment from "moment";

let messages = [];
const messageData = fs.readFileSync(
  path.resolve(__dirname, "../data/messages.json"),
  { encoding: "utf-8" }
);
messages = JSON.parse(messageData);

export default messages;
