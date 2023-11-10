"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointments_controller_1 = require("../controllers/appointments.controller");
const appointmentsRouter = express_1.default.Router();
appointmentsRouter.route('/insertappointment').post((req, res) => new appointments_controller_1.AppointmentsController().insertAppointment(req, res));
appointmentsRouter.route('/getAppointmentsForDoctor').post((req, res) => new appointments_controller_1.AppointmentsController().getAppointmentsForDoctor(req, res));
appointmentsRouter.route('/getAllUserAppointments').post((req, res) => new appointments_controller_1.AppointmentsController().getAllUserAppointments(req, res));
appointmentsRouter.route('/deleteAppointment').post((req, res) => new appointments_controller_1.AppointmentsController().deleteAppointment(req, res));
appointmentsRouter.route('/getAppointmentForUser').post((req, res) => new appointments_controller_1.AppointmentsController().getAppointmentForUser(req, res));
exports.default = appointmentsRouter;
//# sourceMappingURL=appointments.router.js.map