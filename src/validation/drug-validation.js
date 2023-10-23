import Joi from "joi";

const createDrugValidation = Joi.object({
    name: Joi.string().max(100).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().max(255).optional(),
});

const getDrugValidation = Joi.number().positive().required();

const UpdateDrugValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(100).required(),
    price: Joi.number().positive(),
    description: Joi.string().max(255).optional(),
});


export {
    createDrugValidation,
    getDrugValidation,
    UpdateDrugValidation
}