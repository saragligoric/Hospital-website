import express from 'express'
import { AppointmentsController } from '../controllers/appointments.controller';

const appointmentsRouter = express.Router();

appointmentsRouter.route('/insertappointment').post(
    (req, res)=> new AppointmentsController().insertAppointment(req, res)
)

appointmentsRouter.route('/getAppointmentsForDoctor').post(
    (req, res)=> new AppointmentsController().getAppointmentsForDoctor(req, res)
)

appointmentsRouter.route('/getAllUserAppointments').post(
    (req, res)=> new AppointmentsController().getAllUserAppointments(req, res)
)

appointmentsRouter.route('/deleteAppointment').post(
    (req, res)=> new AppointmentsController().deleteAppointment(req, res)
)

appointmentsRouter.route('/getAppointmentForUser').post(
    (req, res)=> new AppointmentsController().getAppointmentForUser(req, res)
)

export default appointmentsRouter; 