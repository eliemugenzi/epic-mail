import Contact from "../models/contacts";
import jwt from "jsonwebtoken";

class ContactController {
  static contacts = (req, res) => {
    res.json({
      status: 200,
      data: Contact.findAll()
    });
  };

  static contact = (req, res) => {
    let { id } = req.params;
    const contactById = Contact.findById({ id });
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
  };

  static createContact = (req, res) => {
    let { firstname, lastname, email } = req.body;
    let newContact = Contact.save({ email, firstname, lastname });
    res
      .json({
        status: 201,
        data: [newContact]
      })
      .status(201);
  };
}

export default ContactController;
