import path from "path";
import fs from "fs";
import moment from "moment";

let users = [];
const userData = fs.readFileSync(
  path.resolve(__dirname, "../data/users.json"),
  { encoding: "utf-8" }
);

users = JSON.parse(userData);
export default users;
