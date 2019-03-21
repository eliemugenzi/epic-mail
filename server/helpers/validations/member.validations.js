import Joi from "joi";


const validateMember = (object) => {
    const memberSchema = Joi.object().keys({
        memberId: Joi.nuumber().integer().required(),
    });
    return Joi.validate(object, memberSchema);
};

export default validateMember;
