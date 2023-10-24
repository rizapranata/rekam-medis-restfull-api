import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { MRValidation, removeMRValidation, searchMRValidation } from "../validation/medicalRecord-validation.js"
import { validate } from "../validation/validation.js"

const create = async (user, request, patientId) => {
    const medicalRecord = validate(MRValidation, request);
    medicalRecord.username = user.username;

    //check data patient 
    const totalDataPatient = await prismaClient.patient.count({
        where: {
            id: patientId
        }
    })

    if (totalDataPatient < 1) {
        throw new ResponseError(404, "Mdical record is not found");
    }

    const patient = await prismaClient.patient.findUnique({
        where: {
            id: patientId
        },
    })

    const historyRecord = await prismaClient.medicalRecord.count({
        where: {
            patientId: patientId
        }
    });

    if (historyRecord === 1) {
        throw new ResponseError(404, "Medical records patient is already");
    }

    medicalRecord.patientId = patient.id;

    return prismaClient.medicalRecord.create({
        data: medicalRecord,
        select: {
            id: true,
            patientId: true,
            problem: true,
            diagnosis: true,
            note: true,
            createdAt: true,
            updatedAt: true,
            username: true
        }
    })
}

const search = async (user, request) => {
    request = validate(searchMRValidation, request);

     // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;
    
    const filters = [];

    filters.push({
        username: user.username
    })

    if (request.name) {
        filters.push({
            name: {
                contains: request.name
            }
        })
    }

    if (request.nik) {
        filters.push({
            nik: {
                contains: request.nik
            }
        })
    }

    console.log("isi Filters:", filters);


    const medicalRecords = await prismaClient.medicalRecord.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip,
        include: {
            patient: true
        }
    });

    const totalItems = await prismaClient.medicalRecord.count({
        where: {
            AND: filters
        }
    });

    return {
        data: medicalRecords,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

const remove = async (user, medicalRecordId) => {
    medicalRecordId = validate(removeMRValidation, medicalRecordId);

    const totalDataInDatabase = await prismaClient.medicalRecord.count({
        where: {
            username: user.username,
            id: medicalRecordId
        }
    });

    if (!totalDataInDatabase) {
        throw new ResponseError(404, "Patient is not found");
    }

    return prismaClient.medicalRecord.delete({
        where: {
            id: medicalRecordId
        }
    })
}

export default {
    create,
    search,
    remove
}