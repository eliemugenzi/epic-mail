import validateUser from "../helpers/validations/user";
import validateMessage from "../helpers/validations/message";
import validateGrpMsg from "../helpers/validations/groupmessages";
import validateGroup from "../helpers/validations/groups.validations";
import validateMember from "../helpers/validations/member.validations";
import groupNameValidation from "../helpers/validations/groupName.validations";

export const userValidate = (req, res, next) => {
    const { error } = validateUser(req.body);
    if (error) {
        res.status(400).json({
            status: 400,
            error: error.details[0].message.replace(
                /[$\/\\#,+()$~%.'":*<>{}]/g,
                "",
            ),
        });
    } else {
        next();
    }
};

export const messageValidate = (req, res, next) => {
    const { error } = validateMessage(req.body);
    if (error) {
        res.status(400).json({
            status: 400,
            error: error.details[0].message.replace(
                /[$\/\\#,+()$~%.'":*<>{}]/g,
                "",
            ),
        });
    } else {
        next();
    }
};

export const groupMessageValidate = (req, res, next) => {
    const { error } = validateGrpMsg(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            error: error.details[0].message.replace(
                /[$\/\\#,+()$~%.'":*<>{}]/g,
                "",
            ),
        });
    }
    next();
};

export const groupsValidate = (req, res, next) => {
    const { error } = validateGroup(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            error: error.details[0].message.replace(
                /[$\/\\#,+()$~%.'":*<>{}]/g,
                "",
            ),
        });
    }
    next();
};

export const memberValidate = (req, res, next) => {
    const { error } = validateMember(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            error: error.details[0].message.replace(
                /[$\/\\#,+()$~%.'":*<>{}]/g,
                "",
            ),
        });
    }
    next();
};

export const nameValidate = (req, res, next) => {
    const { error } = groupNameValidation(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            error: error.details[0].message.replace(/[$\/\\#,+()$~%.'":*<>{}]/g, ""),
        });
    }
    next();
};
