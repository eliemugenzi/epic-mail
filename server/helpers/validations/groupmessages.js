import Joi from "joi";

const validateGrpMsg = (message) => {
    const schema = Joi.object().keys({
        subject: Joi.string().required(),
        message: Joi.string().required(),
    });
    return Joi.validate(message, schema);
};

export default validateGrpMsg;
