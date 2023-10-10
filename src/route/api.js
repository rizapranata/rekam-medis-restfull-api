import express from "express"
import { authMiddleware } from "../middleware/auth-middleware.js"
import userController from "../controller/user-controller.js";
import adminController from "../controller/admin-controller.js";

const userRouter = new express.Router()
userRouter.use(authMiddleware)

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

//Create Admin API
userRouter.post('/api/admins', adminController.create);
userRouter.get('/api/admins/:adminId', adminController.get);
userRouter.put('/api/admins/:adminId', adminController.update);

export {
    userRouter
}