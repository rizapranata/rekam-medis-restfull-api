import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createDoctorValidation, getDoctorValidation } from "../validation/doctor-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt";


const create = async (user, request) => {
    const doctor = validate(createDoctorValidation, request);
    doctor.super_user = user.super_user;

    const countDoctor = await prismaClient.doctor.count({
        where: {
            username: doctor.username
        }
    });

    if (countDoctor === 1) {
        throw new ResponseError(400, "Doctor already exist");
    }

    doctor.password = await bcrypt.hash(doctor.password, 10);

    return prismaClient.doctor.create({
        data: doctor,
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            phone: true,
            password: true,
            specialist: true,
            poly_name: true,
            address: true
        }
    })

}

const get = async (user, doctorId) => {
    doctorId = validate(getDoctorValidation, doctorId);

    const doctor = await prismaClient.doctor.findFirst({
        where: {
            super_user: user.super_user,
            id: doctorId
        },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            phone: true,
            password: true,
            specialist: true,
            poly_name: true,
            address: true
        }
    });

    if (!doctor) {
        throw new ResponseError(404, "Doctor is not found");
    }

    return doctor;
}

export default {
    create,
    get
}