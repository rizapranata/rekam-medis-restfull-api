import userService from "../service/user-service.js"

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const username = req.user.super_user;
        const result = await userService.get(username);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const username = req.user.super_user;
        const request = req.body;
        request.super_user = username;

        const result = await userService.update(request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.super_user);
        res.status(200).json({
            data: "Ok"
        })
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    login,
    get,
    update,
    logout
}