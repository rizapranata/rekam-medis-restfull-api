import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createPatientValidation } from "../validation/patient-validation.js"
import { validate } from "../validation/validation.js"

const create = async (user, request) => {
    const patient = validate(createPatientValidation, request);
    patient.username = user.username;

    const countPatient = await prismaClient.patient.count({
        where: {
            nik: patient.nik
        }
    });

    if (countPatient === 1) {
        throw new ResponseError(400, "Patient already exist");
    }

    return prismaClient.patient.create({
        data: patient,
        select: {
            id: true,
            name: true,
            gender: true,
            age: true,
            nik: true,
            email: true,
            phone: true,
            address: true,
            username: true
        }
    })
}

export default {
    create
}