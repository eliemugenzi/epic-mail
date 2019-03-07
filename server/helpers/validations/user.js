import Joi from "joi";

const validateUser = user => {
  const schema = Joi.object().keys({
    firstname: Joi.string()
      .alphanum()
      .max(30)
      .required(),
    lastname: Joi.string()
      .alphanum()
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{6,15}/)
      .required()
  });

  return Joi.validate(user, schema);
};

export default validateUser;
