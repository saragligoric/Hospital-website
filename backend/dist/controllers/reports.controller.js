"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const reports_1 = __importDefault(require("../models/reports"));
class ReportsController {
    constructor() {
        this.getReport = (req, res) => {
            let doctorUsername = req.body.doctorUsername;
            let date = req.body.date;
            let time = req.body.time;
            reports_1.default.findOne({ 'doctorUsername': doctorUsername, 'selectedDate': date, 'selectedTime': time }, (err, examinations) => {
                if (err)
                    console.log(err);
                else
                    res.json(examinations);
            });
        };
        this.getAllUserReports = (req, res) => {
            let patientUsername = req.body.patientUsername;
            reports_1.default.find({ 'patientUsername': patientUsername }, (err, examinations) => {
                if (err)
                    console.log(err);
                else
                    res.json(examinations);
            });
        };
        this.insertReport = (req, res) => {
            let patientUsername = req.body.patientUsername;
            let patientFirstname = req.body.patientFirstname;
            let patientLastname = req.body.patientLastname;
            let doctorUsername = req.body.doctorUsername;
            let doctorFirstname = req.body.doctorFirstname;
            let doctorLastname = req.body.doctorLastname;
            let doctorSpecialization = req.body.doctorSpecialization;
            let date = req.body.examDate;
            let time = req.body.examTime;
            let nextDate = req.body.nextDate;
            let reason = req.body.reason;
            let diagnosis = req.body.diagnosis;
            let therapy = req.body.therapy;
            const documentsToInsert = [
                { patientUsername: patientUsername, patientFirstname: patientFirstname, patientLastname: patientLastname, doctorUsername: doctorUsername, doctorFirstname: doctorFirstname, doctorLastname: doctorLastname,
                    doctorSpecialization: doctorSpecialization, selectedDate: date, selectedTime: time,
                    nextDate: nextDate, reason: reason, diagnosis: diagnosis, therapy: therapy }
            ];
            reports_1.default.insertMany(documentsToInsert);
            res.json({ 'message': 'Report made' });
        };
    }
}
exports.ReportsController = ReportsController;
//# sourceMappingURL=reports.controller.js.map