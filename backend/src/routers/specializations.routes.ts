import express from 'express'
import { DoctorsController } from '../controllers/doctors.controller';
import { SpecializationsController } from '../controllers/specializations.controller';

const specializationRouter = express.Router();

specializationRouter.route('/add').post(
    (req, res)=> new SpecializationsController().add(req, res)
)

export default specializationRouter;