import Joi from "joi";

const createAdminValidation = Joi.object({
    username: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
    password: Joi.string().max(100).required(),
    status: Joi.boolean().required()
})

const getAdminValidation = Joi.number().positive().required();

const updateAdminValidation = Joi.object({
    id: Joi.number().positive().required(),
    username: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
    password: Joi.string().max(100).required(),
    status: Joi.boolean().required()
})

export {
    createAdminValidation,
    getAdminValidation,
    updateAdminValidation
}