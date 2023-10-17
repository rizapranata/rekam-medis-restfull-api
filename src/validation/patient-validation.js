import Joi from "joi";

const createPatientValidation = Joi.object({
    name: Joi.string().max(100).required(),
    gender: Joi.string().max(20).required(),
    age: Joi.number().positive().required(),
    nik: Joi.string().max(30).required(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
    address: Joi.string().max(255).optional()
});

const updatePatientValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(100).required(),
    gender: Joi.string().max(20).required(),
    age: Joi.number().positive().required(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
    address: Joi.string().max(255).optional()
})

export {
    createPatientValidation,
    updatePatientValidation
}

