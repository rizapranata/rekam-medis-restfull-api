import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createAdminValidation, getAdminValidation } from "../validation/admin-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt";

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

export default {
    create,
    get
}