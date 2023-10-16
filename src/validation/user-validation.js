import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
    specialist: Joi.string().max(100).default("-"),
    poliName: Joi.string().max(100).default("-"),
    status: Joi.boolean().default(false),
    role: Joi.string().max(20).required()
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).optional(),
    name: Joi.string().max(100).optional(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
    specialist: Joi.string().max(100).default("-"),
    poliName: Joi.string().max(100).default("-"),
    status: Joi.boolean().optional(),
    role: Joi.string().max(20).required()
});

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}