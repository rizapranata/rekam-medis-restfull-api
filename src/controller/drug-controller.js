import { policyFor } from "../policy/index.js";
import drugService from "../service/drug-service.js";

const create = async (req, res, next) => {
    let policy = policyFor(req.user);
    if (!policy.can("create", "Drug")) {
        return res.json({
            error: 1,
            message: `You're not allowed to perform this action`,
        })
    }

    try {
        const user = req.user;
        const request = req.body;

        const result = await drugService.create(user, request);
        res.status(200).json({
            status: "success",
            message: "create drug successful",
            data: result
        })
    } catch (e) {
        console.log("Print error controller:", e);
        next(e)
    }
}

export default {
    create
}