"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_controller_1 = require("../controllers/patients.controller");
const patientRouter = express_1.default.Router();
patientRouter.route('/getallpatients').get((req, res) => new patients_controller_1.PatientsController().getAllPatients(req, res));
patientRouter.route('/delete').post((req, res) => new patients_controller_1.PatientsController().delete(req, res));
patientRouter.route('/updatePatient').post((req, res) => new patients_controller_1.PatientsController().updatePatient(req, res));
exports.default = patientRouter;
//# sourceMappingURL=patient.routes.js.map