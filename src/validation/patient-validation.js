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
});

const getPatientValidation = Joi.number().positive().required();

const searchPatientValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
    gender: Joi.string().optional(),
    age: Joi.number().positive().optional(),
    nik: Joi.string().max(30).optional(),
    email: Joi.string().max(200).email().optional(),
    phone: Joi.string().max(20).optional(),
})

export {
    createPatientValidation,
    updatePatientValidation,
    getPatientValidation,
    searchPatientValidation
}

