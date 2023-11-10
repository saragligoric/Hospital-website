"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsController = void 0;
const appointment_1 = __importDefault(require("../models/appointment"));
class AppointmentsController {
    constructor() {
        this.insertAppointment = (req, res) => {
            let patientUsername = req.body.patientUsername;
            let patientFirstname = req.body.patientFirstname;
            let patientLastname = req.body.patientLastname;
            let doctorUsername = req.body.doctorUsername;
            let doctorFirstname = req.body.doctorFirstname;
            let doctorLastname = req.body.doctorLastname;
            let doctorBranch = req.body.doctorBranch;
            let selectedDate = req.body.selectedDate;
            let selectedTime = req.body.selectedTime;
            let examTitle = req.body.examTitle;
            let examDuration = req.body.examDuration;
            let examPrice = req.body.examPrice;
            const documentsToInsert = [
                { patientUsername: patientUsername, patientFirstname: patientFirstname, patientLastname: patientLastname, doctorUsername: doctorUsername, doctorFirstname: doctorFirstname, doctorLastname: doctorLastname,
                    doctorBranch: doctorBranch, selectedDate: selectedDate, selectedTime: selectedTime, examTitle: examTitle,
                    examDuration: examDuration, examPrice: examPrice }
            ];
            appointment_1.default.insertMany(documentsToInsert);
            res.json({ 'message': 'Appointment made' });
        };
        this.getAppointmentsForDoctor = (req, res) => {
            let doctorUsername = req.body.doctorUsername;
            appointment_1.default.find({ 'doctorUsername': doctorUsername }, (err, examinations) => {
                if (err)
                    console.log(err);
                else
                    res.json(examinations);
            });
        };
        this.getAllUserAppointments = (req, res) => {
            let patientUsername = req.body.patientUsername;
            appointment_1.default.find({ 'patientUsername': patientUsername }, (err, examinations) => {
                if (err)
                    console.log(err);
                else
                    res.json(examinations);
            });
        };
        this.deleteAppointment = (req, res) => {
            let examTitle = req.body.examTitle;
            let selectedDate = req.body.selectedDate;
            let selectedTime = req.body.selectedTime;
            let patientUsername = req.body.patientUsername;
            appointment_1.default.deleteOne({ 'examTitle': examTitle, 'selectedDate': selectedDate, 'selectedTime': selectedTime, 'patientUsername': patientUsername }, (err, resp) => {
                if (err)
                    console.log(err);
            });
        };
        this.getAppointmentForUser = (req, res) => {
            let doctorUsername = req.body.doctorUsername;
            let patientFirstname = req.body.patientFirstname;
            let patientLastname = req.body.patientLastname;
            let date = req.body.date;
            let time = req.body.time;
            appointment_1.default.findOne({ 'doctorUsername': doctorUsername, 'patientFirstname': patientFirstname, 'patientLatname': patientLastname, 'selectedDate': date, 'selectedTime': time }, (err, examinations) => {
                if (err)
                    console.log(err);
                else
                    res.json(examinations);
            });
        };
    }
}
exports.AppointmentsController = AppointmentsController;
//# sourceMappingURL=appointments.controller.js.map