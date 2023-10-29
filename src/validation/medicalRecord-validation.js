import Joi from "joi";
import JoiDate from "@joi/date";
const joiDateUse = Joi.extend(JoiDate);

const drugIdObj = Joi.object({
    drugSelectedId: Joi.number().integer().min(0).optional(),
  });

const createMRValidation = Joi.object({
    problem: Joi.string().max(100).required(),
    diagnosis: Joi.string().max(200).required(),
    note: Joi.string().max(255).optional(),
    drugItems: Joi.array().items(drugIdObj)
});

const updateMRValidation = Joi.object({
    id: Joi.number().positive().required(),
    problem: Joi.string().max(100).required(),
    diagnosis: Joi.string().max(200).required(),
    note: Joi.string().max(255).optional(),
    drugItems: Joi.array().items(drugIdObj)
});

const searchMRValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().max(100).optional(),
    nik: Joi.string().max(30).optional(),
});

const getMRValidation = Joi.number().positive().required();

export {
    createMRValidation,
    searchMRValidation,
    getMRValidation,
    updateMRValidation
}