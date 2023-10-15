import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createDoctorValidation, doctorLoginValidation, doctorLogoutValidation, getDoctorValidation, searchDoctorValidation, updateDoctorValidation } from "../validation/doctor-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

const remove = async (user, doctorId) => {
    doctorId = validate(getDoctorValidation, doctorId);

    const totalInDatabase = await prismaClient.doctor.count({
        where: {
            super_user: user.super_user,
            id: doctorId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "Doctor is not found");
    }

    return prismaClient.doctor.delete({
        where: {
            id: doctorId
        }
    })
}

const search = async (user, request) => {
    request = validate(searchDoctorValidation, request);
    
    // page = 1: ((page - 1) * size) = 0
    // page = 2: ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;
    const filters = [];

    filters.push({
        super_user: user.super_user
    });

    if (request.name) {
        filters.push({
            name: {
                contains: request.name
            }
        })
    }

    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        })
    }

    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        })
    }

    const doctors = await prismaClient.doctor.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.doctor.count({
        where: {
            AND: filters
        }
    });

    return {
        data: doctors,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

const login = async (request) => {
    const loginRequest = validate(doctorLoginValidation, request);

    const doctor = await prismaClient.doctor.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!doctor) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, doctor.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const role = "doctor";
    const token = role + "-" + uuid().toString();
    return prismaClient.doctor.update({
        data: {
            token: token
        },
        where: {
            username: doctor.username
        },
        select: {
            token: true
        }
    })
}

const logout = async (username) => {
    username = validate(doctorLogoutValidation, username);
    const doctor = await prismaClient.doctor.findUnique({
        where: {
            username: username
        }
    });

    if (!doctor) {
        throw new ResponseError(404, "Doctor is not found");
    }

    return prismaClient.admin.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })

}

export default {
    create,
    get,
    updtae,
    remove,
    search,
    login,
    logout
}