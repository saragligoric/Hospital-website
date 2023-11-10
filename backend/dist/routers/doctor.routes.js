"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctors_controller_1 = require("../controllers/doctors.controller");
const doctorRouter = express_1.default.Router();
doctorRouter.route('/getalldoctors').get((req, res) => new doctors_controller_1.DoctorsController().getAllDoctors(req, res));
doctorRouter.route('/delete').post((req, res) => new doctors_controller_1.DoctorsController().delete(req, res));
doctorRouter.route('/add').post((req, res) => new doctors_controller_1.DoctorsController().add(req, res));
doctorRouter.route('/updateDoctor').post((req, res) => new doctors_controller_1.DoctorsController().updateDoctor(req, res));
doctorRouter.route('/addExam').post((req, res) => new doctors_controller_1.DoctorsController().addExam(req, res));
doctorRouter.route('/removeExam').post((req, res) => new doctors_controller_1.DoctorsController().removeExam(req, res));
exports.default = doctorRouter;
//# sourceMappingURL=doctor.routes.js.map