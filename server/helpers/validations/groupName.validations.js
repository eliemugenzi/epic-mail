import Joi from "joi";

const groupNameValidation = (object) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
    });
    return Joi.validate(object, schema);
};

export default groupNameValidation;