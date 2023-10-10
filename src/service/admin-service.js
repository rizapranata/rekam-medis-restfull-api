import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createAdminValidation } from "../validation/admin-validation.js"
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

export default {
    create
}