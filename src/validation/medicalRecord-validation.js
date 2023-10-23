import Joi from "joi";
import JoiDate from "@joi/date";
const joiDateUse = Joi.extend(JoiDate);

const MRValidation = Joi.object({
    problem: Joi.string().max(100).required(),
    diagnosis: Joi.string().max(200).required(),
    note: Joi.string().max(255).optional(),
});

const searchMRValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().max(100).optional(),
    nik: Joi.string().max(30).optional(),
});

const removeMRValidation = Joi.number().positive().required();

export {
    MRValidation,
    searchMRValidation,
    removeMRValidation
}