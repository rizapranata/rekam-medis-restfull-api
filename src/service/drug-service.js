import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createDrugValidation } from "../validation/drug-validation.js"
import { validate } from "../validation/validation.js"

const create = async (user, request) => {
    const drug = validate(createDrugValidation, request);
    drug.username = user.username;

    const totalDataInDatabase = await prismaClient.drug.count({
        where: {
            name: drug.name
        }
    });

    if (totalDataInDatabase === 1) {
        throw new ResponseError(400, "Drug is already exist");
    }

    return prismaClient.drug.create({
        data: drug,
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
            username: true,
        }
    })
}

export default {
    create
}