import Joi from 'joi';
import IUser from "../interfaces/IUser"


const UserValidator = (data: IUser) => {
    const loginRule = Joi.object({
        email: Joi.string().required().email().messages({
            "string.required": "Vui lòng nhập email",
            "string.email": "Email không đúng định dạng"
        }),
        password: Joi.string().required().messages({
            "string.required": "Vui lòng nhập password",
        }),
    });

    return loginRule.validate(data);
};

export default UserValidator;
