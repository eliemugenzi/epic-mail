import Joi from "joi";

const validateLogin = user => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{6,15}/)
      .required()
  });

  return Joi.validate(user, schema);
};

export default validateLogin;
