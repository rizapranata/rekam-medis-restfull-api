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

export default {
    create,
    update
}