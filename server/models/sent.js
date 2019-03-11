import path from "path";
import fs from "fs";
import moment from "moment";

let sent = [];

const sentData = fs.readFileSync(path.resolve(__dirname, "../data/sent.json"), {
  encoding: "utf-8"
});
sent = JSON.parse(sentData);

export default sent;
