import fs from "fs";
import path from "path";
import moment from "moment";

let contacts = [];

const contactsData = fs.readFileSync(
  path.resolve(__dirname, "../data/contacts.json"),
  { encoding: "utf-8" }
);
contacts = JSON.parse(contactsData);
class Contact {
  constructor({ _email, _firstname, _lastname }) {
    this.email = _email;
    this.firstname = _firstname;
    this.lastname = _lastname;
  }

  static save({ email, firstname, lastname }) {
    let newContact = {
      id: contacts.length + 1,
      firstname,
      lastname,
      email,
      createdOn: moment().format("LL")
    };
    contacts.push(newContact);
    fs.writeFileSync(
      path.resolve(__dirname, "../data/contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return newContact;
  }

  static findAll() {
    return contacts;
  }

  static findById({ id }) {
    return contacts.find((contact = parseInt(contact.id) === parseInt(id)));
  }

  static findByEmail({ email }) {
    return contacts.find(contact => contact.email === email);
  }

  static remove({ id }) {
    let newContacts = contacts.filter(
      contact => parseInt(contact.id) !== parseInt(id)
    );
    fs.writeFileSync(
      path.resolve(__dirname, "../data/contacts.json"),
      JSON.stringify(newContacts, null, 2)
    );
    return newContacts;
  }
}

export default Contact;
