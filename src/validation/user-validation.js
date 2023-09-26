import Joi from "joi";

const registerUserValidation = Joi.object({
    super_user: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
    super_user: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

export {
    registerUserValidation,
    loginUserValidation
}