import adminService from "../service/admin-service.js";

const create = async(req, res, next) => {
    try {
        const super_user = req.user;
        const request = req.body;
        const result = await adminService.create(super_user, request);
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
        const adminId = req.params.adminId;
        const result = await adminService.get(super_user, adminId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const adminId = req.params.adminId;
        const request = req.body;
        request.id = adminId;

        const result = await adminService.update(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const adminId = req.params.adminId;

        await adminService.remove(user, adminId);
        res.status(200).json({
            data: "Ok"
        })
    } catch (e) {
        next(e)
    }
}

const search = async (req, res, next) => {
    try {
        console.log("query:", req.query);
        const user = req.user;
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone
        };

        const result = await adminService.search(user, request);
        res.status(200).json({
            data: result.data
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}