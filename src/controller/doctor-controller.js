import { prismaClient } from "../application/database.js";
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

const get = async (req, res, next) => {
    try {
        const super_user = req.user;
        const doctorId = req.params.doctorId;
        const result = await doctorService.get(super_user, doctorId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const super_user = req.user;
        const doctorId = req.params.doctorId;
        const request = req.body;
        request.id = doctorId;

        const result = await doctorService.updtae(super_user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const search = async (req, res, next) => {
    try {
        console.log("Query:", req.query);
        const super_user = req.user;
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        };

        const result = await doctorService.search(super_user, request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        });

    } catch (e) {
        next(e)
    }
}

export default {
    create,
    get,
    update,
    search
}