import doctorService from "../service/doctor-service.js";

const create = async (req, res, next) => {
    try {
        const super_user = req.user;
        const request = req.body;
        const result = await doctorService.create(super_user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create
}