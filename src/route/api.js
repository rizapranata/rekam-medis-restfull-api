import express from "express"
import { authMiddleware } from "../middleware/auth-middleware.js"
import userController from "../controller/user-controller.js";

const userRouter = new express.Router()
userRouter.use(authMiddleware)

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);
userRouter.post('/api/users/create', userController.create);
userRouter.delete('/api/users/delete', userController.remove);

export {
    userRouter
}