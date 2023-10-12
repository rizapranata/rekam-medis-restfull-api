import express from "express"
import { authMiddleware } from "../middleware/auth-middleware.js"
import userController from "../controller/user-controller.js";
import adminController from "../controller/admin-controller.js";
import doctorController from "../controller/doctor-controller.js";

const userRouter = new express.Router()
userRouter.use(authMiddleware)

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

//Admin API
userRouter.post('/api/admins', adminController.create);
userRouter.get('/api/admins/:adminId', adminController.get);
userRouter.put('/api/admins/:adminId', adminController.update);
userRouter.delete('/api/admins/:adminId', adminController.remove);
userRouter.get('/api/admins', adminController.search);

//Doctor API
userRouter.post('/api/doctors', doctorController.create);
userRouter.get('/api/doctors/:doctorId', doctorController.get);
userRouter.put('/api/doctors/:doctorId', doctorController.update);
userRouter.delete('/api/doctors/:doctorId', doctorController.remove);
userRouter.get('/api/doctors', doctorController.search);

export {
    userRouter
}