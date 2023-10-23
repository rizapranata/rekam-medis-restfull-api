import express from "express"
import { authMiddleware } from "../middleware/auth-middleware.js"
import userController from "../controller/user-controller.js";
import patientController from "../controller/patient-controller.js";
import polyclinicController from "../controller/polyclinic-controller.js";
import drugController from "../controller/drug-controller.js";
import medicalRecordController from "../controller/medicalRecord-controller.js";

const userRouter = new express.Router()
userRouter.use(authMiddleware)

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);
userRouter.post('/api/users/create', userController.create);
userRouter.delete('/api/users/delete', userController.remove);
userRouter.get('/api/users', userController.search);

// Patient API
userRouter.post('/api/patients/create', patientController.create);
userRouter.put('/api/patients/:patientId', patientController.update);
userRouter.get('/api/patients/:patientId', patientController.get);
userRouter.delete('/api/patients/:patientId', patientController.remove);
userRouter.get('/api/patients', patientController.search);

// Polyclinic API
userRouter.post('/api/polyclinics/create', polyclinicController.create);
userRouter.get('/api/polyclinics/:polyId', polyclinicController.get);
userRouter.put('/api/polyclinics/:polyId', polyclinicController.update);
userRouter.get('/api/polyclinics', polyclinicController.getAll);
userRouter.delete('/api/polyclinics/:polyId', polyclinicController.remove);

//Drug API
userRouter.post('/api/drugs/create', drugController.create);

// MedicalRecord API
userRouter.post('/api/medical-records/:patientId', medicalRecordController.create);
userRouter.get('/api/medical-records', medicalRecordController.search);
userRouter.delete('/api/medical-records/:medicalRecordId', medicalRecordController.remove);

export {
    userRouter
}