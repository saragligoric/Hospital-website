"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsController = void 0;
const patients_1 = __importDefault(require("../models/patients"));
const mongodb_1 = require("mongodb");
class PatientsController {
    constructor() {
        this.getAllPatients = (req, res) => {
            patients_1.default.find({}, (err, patients) => {
                if (err)
                    console.log(err);
                else
                    res.json(patients);
            });
        };
        this.delete = (req, res) => {
            let username = req.body.username;
            patients_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'deleted patient' });
            });
        };
        this.updatePatient = (req, res) => {
            let doctor = req.body.patient;
            const objectId = new mongodb_1.ObjectId(doctor._id);
            patients_1.default.updateOne({ _id: objectId }, { $set: { 'firstname': doctor.firstname, 'lastname': doctor.lastname,
                    'address': doctor.address, 'phone': doctor.phone, 'email': doctor.email } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'updated' });
            });
        };
    }
}
exports.PatientsController = PatientsController;
//# sourceMappingURL=patients.controller.js.map