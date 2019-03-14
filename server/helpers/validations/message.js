import Joi from 'joi';

const validateMessage = (message) => {
  const schema = Joi.object().keys({
    receiverId: Joi.number().integer(),
    subject: Joi.string()
      .alphanum()
      .required(),
    message: Joi.string()
      .alphanum()
      .required(),
  });
  return Joi.validate(message, schema);
};

export default validateMessage;
