import { policyFor } from "../policy/index.js";
import patientService from "../service/patient-service.js";

const create = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("create", "Patient")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const request = req.body;
        const result = await patientService.create(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        if (e && e.name === "ValidationError") {
            return res.json({
              error: 1,
              message: error.message,
              fields: error.errors,
            });
          }
        next(e)
    }
}

const update = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("update", "Patient")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const patientId = req.params.patientId;
        const request = req.body;
        request.id = patientId;

        const result = await patientService.update(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("view", "Patient")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const patientId = req.params.patientId;

        const result = await patientService.get(user, patientId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const search = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("view", "Patient")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            gender: req.query.gender,
            age: req.query.age,
            nik: req.query.nik,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        };

        const result = await patientService.search(user, request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("delete", "Patient")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const patientId = req.params.patientId;
        await patientService.remove(user, patientId);
        res.status(200).json({
            data: `patient id ${patientId} is already deleted!`
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    update,
    get,
    search,
    remove
}