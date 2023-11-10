import express from 'express'
import { PatientsController } from '../controllers/patients.controller';

const patientRouter = express.Router();

patientRouter.route('/getallpatients').get(
    (req, res)=> new PatientsController().getAllPatients(req, res)
)

patientRouter.route('/delete').post(
    (req, res)=> new PatientsController().delete(req, res)
)

patientRouter.route('/updatePatient').post(
    (req, res)=> new PatientsController().updatePatient(req, res)
)

export default patientRouter;