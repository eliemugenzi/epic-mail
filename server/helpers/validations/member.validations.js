import Joi from "joi";


const validateMember = (object) => {
    const memberSchema = Joi.object().keys({
        memberId: Joi.number().integer().required(),
    });
    return Joi.validate(object, memberSchema);
};

export default validateMember;
