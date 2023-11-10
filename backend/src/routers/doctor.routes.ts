import express from 'express'
import { DoctorsController } from '../controllers/doctors.controller';

const doctorRouter = express.Router();

doctorRouter.route('/getalldoctors').get(
    (req, res)=> new DoctorsController().getAllDoctors(req, res)
)

doctorRouter.route('/delete').post(
    (req, res)=> new DoctorsController().delete(req, res)
)

doctorRouter.route('/add').post(
    (req, res)=> new DoctorsController().add(req, res)
)

doctorRouter.route('/updateDoctor').post(
    (req, res)=> new DoctorsController().updateDoctor(req, res)
)

doctorRouter.route('/addExam').post(
    (req, res)=> new DoctorsController().addExam(req, res)
)

doctorRouter.route('/removeExam').post(
    (req, res)=> new DoctorsController().removeExam(req, res)
)

export default doctorRouter;