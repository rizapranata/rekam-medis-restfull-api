import { request } from "express";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createAdminValidation, getAdminValidation, loginAdminValidation, searchAdminValidation, updateAdminValidation } from "../validation/admin-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const create = async (user, request) => {
    const admin = validate(createAdminValidation, request);
    admin.super_user = user.super_user;

    const countAdmin = await prismaClient.admin.count({
        where: {
            username: admin.username
        }
    });

    if (countAdmin === 1) {
        throw new ResponseError(400, "Admin already exist");
    }

    admin.password = await bcrypt.hash(admin.password, 10);

    return prismaClient.admin.create({
        data: admin,
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            phone: true,
            status: true
        }
    })
}

const login = async (request) => {
    const loginRequest = validate(loginAdminValidation, request);

    const user = await prismaClient.admin.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!user) {
        console.log("check user");
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        console.log("check password");
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = uuid().toString();
    return prismaClient.admin.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    })
}

const get = async (user, adminId) => {
    adminId = validate(getAdminValidation, adminId);

    const admin = await prismaClient.admin.findFirst({
        where: {
            super_user: user.super_user,
            id: adminId
        },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            phone: true
        }
    });

    if (!admin) {
        throw new ResponseError(404, "Admin is not found");
    }

    return admin;
}

const update = async (user, request) => {
    const admin = validate(updateAdminValidation, request);
    const totalAdminIndatabase = await prismaClient.admin.count({
        where: {
            super_user: user.super_user,
            id: admin.id
        }
    });

    if (!totalAdminIndatabase) {
        throw new ResponseError(404, "Admin is not fount");
    }

    admin.password = await bcrypt.hash(admin.password, 10);

    return prismaClient.admin.update({
        where: {
            id: admin.id
        },
        data: {
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            password: admin.password,
            status: admin.status
        },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            phone: true,
            password: true,
            status: true
        }
    })
}

const remove = async (user, adminId) => {
    adminId = validate(getAdminValidation, adminId);

    const totalInDatabase = await prismaClient.admin.count({
        where: {
            super_user: user.super_user,
            id: adminId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "Admin is not found");
    }

    return prismaClient.admin.delete({
        where: {
            id: adminId
        }
    })
}

const search = async (user, request) => {
    request = validate(searchAdminValidation, request);

    const filters = [];
    filters.push({
        username: user.username
    });

    if (request.name) {
        filters.push({
            name: {
                contais: request.name
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

    const admins = await prismaClient.admin.findMany({
        where: {
            AND: filters
        }
    })

    return {
        data: admins
    }
}

export default {
    create,
    get,
    update,
    remove,
    search,
    login
}