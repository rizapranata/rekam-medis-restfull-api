import express from "express";
import userController from "../controller/user-controller.js";
import adminController from "../controller/admin-controller.js";

const publicRouter = new express.Router();

// Super user API
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);

// Admin API
publicRouter.post('/api/admins/login', adminController.login);

export {
    publicRouter
}