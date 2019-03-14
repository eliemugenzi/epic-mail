import fs from 'fs';
import path from 'path';


let contacts = [];

const contactsData = fs.readFileSync(
  path.resolve(__dirname, '../data/contacts.json'),
  { encoding: 'utf-8' },
);
contacts = JSON.parse(contactsData);

export default contacts;
