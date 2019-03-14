import path from 'path';
import fs from 'fs';


let messages = [];
const messageData = fs.readFileSync(
  path.resolve(__dirname, '../data/messages.json'),
  { encoding: 'utf-8' },
);
messages = JSON.parse(messageData);

export default messages;
