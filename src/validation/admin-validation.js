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
    name: Joi.string().max(100).required(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
    password: Joi.string().max(100).required(),
    status: Joi.boolean().required()
})

const searchAdminValidation = Joi.object({
    username: Joi.string().optional(),
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional()
})

const loginAdminValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

const logoutAdminValidation = Joi.string().max(100).required();

const adminLogoutValidation = Joi.string().max(100).required();

export {
    createAdminValidation,
    getAdminValidation,
    updateAdminValidation,
    searchAdminValidation,
    loginAdminValidation,
    logoutAdminValidation,
    adminLogoutValidation
}