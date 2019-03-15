import path from 'path';
import fs from 'fs';


let messages = [
  {
    id: 1,
    senderId: 1,
    receiverId: 2,
    subject: "Welcome to the bootcamp cycle 4",
    message: "Hey guys,welcome to the fourth Andela bootcamp edited",
    parentMessageId: 0,
    createdOn: "March 14, 2019",
    status: "sent"
  },
  {
    id: 2,
    senderId: 1,
    receiverId: 2,
    subject: "Welcome to the bootcamp cycle 4 Edited",
    message: "Hey guys,welcome to the fourth Andela bootcamp edited",
    parentMessageId: 0,
    createdOn: "March 14, 2019",
    status: "read"
  },
  {
    id: 3,
    senderId: 1,
    receiverId: 2,
    subject: "Welcome to the bootcamp cycle 4 Edited Draft",
    message: "Hey guys,welcome to the fourth Andela bootcamp edited",
    parentMessageId: 0,
    createdOn: "March 14, 2019",
    status: "draft"
  },
  {
    id: 4,
    senderId: 1,
    receiverId: 2,
    subject: "Experiences in bootcamp",
    message:
      "Yesterday, we wrote about our experience gained from this bootcamp",
    parentMessageId: 0,
    createdOn: "March 14, 2019",
    status: "read"
  },
  {
    id: 5,
    senderId: 2,
    receiverId: 1,
    subject: "Welcome to the bootcamp cycle 4 Edited Draft",
    message: "Hey guys,welcome to the fourth Andela bootcamp edited",
    parentMessageId: 0,
    createdOn: "March 14, 2019",
    status: "draft"
  }
];

export default messages;
