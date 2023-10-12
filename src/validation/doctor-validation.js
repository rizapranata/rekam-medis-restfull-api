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
})

export {
    createDoctorValidation,
    getDoctorValidation,
    updateDoctorValidation
}