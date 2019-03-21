import Joi from "joi";

const validateMessage = (message) => {
    const schema = Joi.object().keys({
        receiverId: Joi.number().integer().required(),
        subject: Joi.string()
            .required(),
        message: Joi.string()
            .required(),
    });
    return Joi.validate(message, schema);
};

export default validateMessage;
