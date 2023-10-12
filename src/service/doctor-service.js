import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createDoctorValidation, getDoctorValidation, updateDoctorValidation } from "../validation/doctor-validation.js"
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

const updtae = async (user, request) => {
    const doctor = validate(updateDoctorValidation, request);

    const totalDoctorInDatabase = await prismaClient.doctor.count({
        where: {
            super_user: user.super_user,
            id: doctor.id
        }
    });

    if (!totalDoctorInDatabase) {
        throw new ResponseError(404, "Doctor is not found");
    }

    doctor.password = await bcrypt.hash(doctor.password, 10);

    return prismaClient.doctor.update({
        where: {
            id: doctor.id
        },
        data: {
            name: doctor.name,
            email: doctor.email,
            phone: doctor.phone,
            password: doctor.password,
            specialist: doctor.specialist,
            poly_name: doctor.poly_name,
            address: doctor.address
        },
        select: {
            id: true,
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

export default {
    create,
    get,
    updtae
}