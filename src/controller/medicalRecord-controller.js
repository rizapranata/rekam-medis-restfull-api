import medicalRecordService from "../service/medicalRecord-service.js";
import { policyFor } from "../policy/index.js";

const create = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("create", "MedicalRecord")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const request = req.body;
        const patientId = parseInt(req.params.patientId);

        const result = await medicalRecordService.create(user, request, patientId);
        res.status(200).json({
            status: "success",
            message: "create medical record successful",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const search = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("view", "MedicalRecord")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            nik: req.query.nik,
            page: req.query.page,
            size: req.query.size
        };
        const result = await medicalRecordService.search(user, request);
        res.status(200).json({
            status: "success",
            message: "create medical record successful",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const medicalRecordId = req.params.medicalRecordId;
        await medicalRecordService.remove(user, medicalRecordId);
        res.status(200).json({
            data: `medical record with id ${medicalRecordId} is already deleted!`
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    search,
    remove
}