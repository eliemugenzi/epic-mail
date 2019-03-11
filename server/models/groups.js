import fs from "fs";
import path from "path";

let groups = [];

const groupsData = fs.readFileSync(
  path.resolve(__dirname, "../data/groups.json"),
  { encoding: "utf-8" }
);
groups = JSON.parse(groupsData);

export default groups;
