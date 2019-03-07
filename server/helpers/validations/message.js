import Joi from "joi";

const validateMessage = message => {
  const schema = Joi.object().keys({
    id: Joi.number().integer(),
    senderId: Joi.number().integer(),
    receiverId: Joi.number().integer(),
    subject: Joi.string()
      .alphanum()
      .required(),
    message: Joi.string()
      .alphanum()
      .required(),
    createdOn: Joi.date().min("now")
  });
  return Joi.validate(message, schema);
};

export default validateMessage;
