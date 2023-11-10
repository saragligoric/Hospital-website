import express from 'express'
import { RegistrationController } from '../controllers/registration.controller';

const registrationRouter = express.Router();

registrationRouter.route('/sendrequest').post(
    (req, res)=> new RegistrationController().insertreq(req, res)
)

registrationRouter.route('/accept').post(
    (req, res)=> new RegistrationController().accept(req, res)
)

registrationRouter.route('/reject').post(
    (req, res)=> new RegistrationController().reject(req, res)
)

registrationRouter.route('/getAllRegistrations').get(
    (req, res)=> new RegistrationController().getAllRegistrations(req, res)
)

export default registrationRouter; 