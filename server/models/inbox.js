import path from 'path';
import fs from 'fs';

let inbox = [];

const inboxData = fs.readFileSync(
  path.resolve(__dirname, '../data/inbox.json'),
  { encoding: 'utf-8' },
);
inbox = JSON.parse(inboxData);

export default inbox;
