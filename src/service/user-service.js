import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            super_user: user.super_user
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exist")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data: user,
        select: {
            super_user: true,
            name: true
        }
    });
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            super_user: loginRequest.super_user
        },
        select: {
            super_user: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const role = "super";
    const token = role + "-" + uuid().toString();
    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            super_user: user.super_user
        },
        select: {
            token: true
        }
    })
}

const get = async (username) => {
    username = validate(getUserValidation, username);
    
    const user = await prismaClient.user.findUnique({
        where: {
            super_user: username
        },
        select: {
            super_user: true,
            name: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return user;
}

const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            super_user: user.super_user
        }
    })

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "User is not found");
    }

    const data = {};
    if (user.name) {
        data.name = user.name
    }
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.user.update({
        where: {
            super_user: user.super_user
        },
        data: data,
        select: {
            super_user: true,
            name: true,
        }
    })
}

const logout = async (username) => {
    username = validate(getUserValidation, username);
    const user = await prismaClient.user.findUnique({
        where : {
            super_user: username
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.user.update({
        where: {
            super_user: username
        },
        data: {
            token: null
        },
        select: {
            super_user: true
        }
    })
}

export default {
    register,
    login,
    get,
    update,
    logout
}