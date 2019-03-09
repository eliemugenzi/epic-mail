import fs from "fs";
import path from "path";

let groupMembers;

const members = fs.readFileSync(
  path.resolve(__dirname, "../data/group-members.json"),
  { encoding: "utf-8" }
);

groupMembers = JSON.parse(members);

export default groupMembers;
