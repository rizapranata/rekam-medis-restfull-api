import Joi from "joi";

const createDoctorValidation = Joi.object({
    username: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
    password: Joi.string().max(100).required(),
    specialist: Joi.string().max(100).required(),
    poly_name: Joi.string().max(100).required(),
    address: Joi.string().max(255).optional(),
});

const getDoctorValidation = Joi.number().positive().required();

const updateDoctorValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(100).required(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
    password: Joi.string().max(100).required(),
    specialist: Joi.string().max(100).required(),
    poly_name: Joi.string().max(100).required(),
    address: Joi.string().max(255).optional()
});

const searchDoctorValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional()
});

const doctorLoginValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

const doctorLogoutValidation = Joi.string().max(100).required();

export {
    createDoctorValidation,
    getDoctorValidation,
    updateDoctorValidation,
    searchDoctorValidation,
    doctorLoginValidation,
    doctorLogoutValidation
}