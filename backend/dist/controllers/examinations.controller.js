"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExaminationsController = void 0;
const doctors_1 = __importDefault(require("../models/doctors"));
const user_1 = __importDefault(require("../models/user"));
const examinations_1 = __importDefault(require("../models/examinations"));
const examinationsRequests_1 = __importDefault(require("../models/examinationsRequests"));
const mongodb_1 = require("mongodb");
class ExaminationsController {
    constructor() {
        this.updateExamination = (req, res) => {
            let _id = req.body._id;
            let specialization = req.body.specialization;
            let title = req.body.title;
            let duration = req.body.duration;
            let price = req.body.price;
            const objectId = new mongodb_1.ObjectId(_id);
            const documentsToInsert = [
                { _id: objectId, specialization: specialization, title: title, duration: duration, price: price }
            ];
            examinations_1.default.deleteOne({ _id: objectId }, (err, resp) => {
                if (err)
                    console.log(err);
            });
            examinations_1.default.insertMany(documentsToInsert);
            res.json({ 'message': 'Examination added' });
        };
        this.getAllExaminationsForSpec = (req, res) => {
            let specialization = req.body.specialization;
            examinations_1.default.find({ 'specialization': specialization }, (err, examinations) => {
                if (err)
                    console.log(err);
                else
                    res.json(examinations);
            });
        };
        this.getExaminationForNameSpec = (req, res) => {
            let specialization = req.body.specialization;
            let title = req.body.title;
            examinations_1.default.findOne({ 'specialization': specialization, 'title': title }, (err, examinations) => {
                if (err)
                    console.log(err);
                else
                    res.json(examinations);
            });
        };
        this.getAllExaminations = (req, res) => {
            examinations_1.default.find({}, (err, requests) => {
                if (err)
                    console.log(err);
                else
                    res.json(requests);
            });
        };
        this.add = (req, res) => {
            let specialization = req.body.specialization;
            let title = req.body.title;
            let duration = req.body.duration;
            let price = req.body.price;
            const documentsToInsert = [
                { specialization: specialization, title: title, duration: duration, price: price }
            ];
            examinations_1.default.insertMany(documentsToInsert);
            res.json({ 'message': 'Examination added' });
        };
        this.insertRequest = (req, res) => {
            let specialization = req.body.specialization;
            let title = req.body.title;
            let duration = req.body.duration;
            let price = req.body.price;
            const documentsToInsert = [
                { specialization: specialization, title: title, duration: duration, price: price }
            ];
            examinationsRequests_1.default.insertMany(documentsToInsert);
            res.json({ 'message': 'Examination request added' });
        };
        this.getAllRequests = (req, res) => {
            examinationsRequests_1.default.find({}, (err, requests) => {
                if (err)
                    console.log(err);
                else
                    res.json(requests);
            });
        };
        this.approveRequest = (req, res) => {
            let specialization = req.body.specialization;
            let title = req.body.title;
            let duration = req.body.duration;
            let price = req.body.price;
            const documentsToInsert = [
                { specialization: specialization, title: title, duration: duration, price: price }
            ];
            examinations_1.default.insertMany(documentsToInsert);
            examinationsRequests_1.default.deleteOne({ 'specialization': specialization, 'title': title, 'duration': duration, 'price': price }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Examination request added' });
            });
        };
        this.denyRequest = (req, res) => {
            let specialization = req.body.specialization;
            let title = req.body.title;
            let duration = req.body.duration;
            let price = req.body.price;
            examinationsRequests_1.default.deleteOne({ 'specialization': specialization, 'title': title, 'duration': duration, 'price': price }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Examination request removed' });
            });
        };
        this.deleteExamination = (req, res) => {
            let specialization = req.body.specialization;
            let title = req.body.title;
            let duration = req.body.duration;
            let price = req.body.price;
            examinations_1.default.deleteOne({ 'specialization': specialization, 'title': title, 'duration': duration, 'price': price }, (err, resp) => {
                if (err)
                    console.log(err);
            });
            let titleText = req.body.title;
            doctors_1.default.findOne({ 'specialization': specialization }, (err, doctor) => {
                if (err)
                    console.log(err);
                else {
                    if (doctor) {
                        let title = {
                            text: titleText
                        };
                        doctors_1.default.updateOne({ 'username': doctor.username }, { $pull: { 'doctorExams': title } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                            }
                        });
                        user_1.default.updateOne({ 'username': doctor.username }, { $pull: { 'doctorExams': title } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                                res.json({ 'message': 'ok' });
                            }
                        });
                    }
                    else {
                        res.json({ 'message': 'error' });
                    }
                }
            });
        };
    }
}
exports.ExaminationsController = ExaminationsController;
//# sourceMappingURL=examinations.controller.js.map