import validateUser from '../helpers/validations/user';
import validateMessage from '../helpers/validations/message';
export const userValidate = (req, res, next) => {
    const { error } = validateUser(req.body);
    if (error) {
        res.status(400).json({
            status: 400,
            error: error.details[0].message,
        });
    }
    else {
        next();
    }
}

export const messageValidate = (req, res, next) => {
    const { error } = validateMessage(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    } else {
      next();
    }
}