import contacts from "../models/contacts";
import jwt from "jsonwebtoken";
import nmoment from "moment";
import moment from "moment";
import path from "path";
import fs from "fs";
class ContactController {
  static contacts(req, res) {
    res.json({
      status: 200,
      data: contacts
    });
  }

  static contact(req, res) {
    let { id } = req.params;
    const contactById = contacts.find(
      contact => parseInt(contact.id) === parseInt(id)
    );
    if (contactById) {
      let context = {
        status: 200,
        data: contactById
      };
      res.json(context);
    } else {
      res.status(404).json({
        status: 404,
        error: "This contact is not found!"
      });
    }
  }

  static createContact(req, res) {
    let { firstname, lastname, email } = req.body;
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
    res
      .json({
        status: 201,
        data: [newContact]
      })
      .status(201);
  }
}

export default ContactController;
