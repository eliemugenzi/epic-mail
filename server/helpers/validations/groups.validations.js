import Joi from "joi";

const validateGroup = (group) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
    });
    return Joi.validate(group, schema);
};

export default validateGroup;
