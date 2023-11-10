"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsController = void 0;
const doctors_1 = __importDefault(require("../models/doctors"));
const user_1 = __importDefault(require("../models/user"));
const mongodb_1 = require("mongodb");
class DoctorsController {
    constructor() {
        this.getAllDoctors = (req, res) => {
            doctors_1.default.find({}, (err, doctors) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctors);
            });
        };
        this.updateDoctor = (req, res) => {
            let doctor = req.body.doctor;
            const objectId = new mongodb_1.ObjectId(doctor._id);
            doctors_1.default.updateOne({ _id: objectId }, { $set: { 'firstname': doctor.firstname, 'lastname': doctor.lastname,
                    'address': doctor.address, 'phone': doctor.phone, 'email': doctor.email, 'specialization': doctor.specialization,
                    'branch': doctor.branch, 'licence': doctor.licence } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'updated' });
            });
        };
        this.update = (req, res) => {
            let username = req.body.username;
            let newpass = req.body.newpass;
            doctors_1.default.updateOne({ 'username': username }, { $set: { 'password': newpass } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Password successfully changed' });
            });
        };
        this.delete = (req, res) => {
            let username = req.body.username;
            doctors_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                //else res.json({'message': 'deleted doctor'})
            });
            user_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'deleted user' });
            });
        };
        this.add = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let phone = req.body.phone;
            let email = req.body.email;
            let spec = req.body.spec;
            let branch = req.body.branch;
            let licence = req.body.licence;
            let address = req.body.address;
            let type = req.body.type;
            let imageurl = req.body.imageurl;
            const documentsToInsert = [
                { username: username, password: password, firstname: firstname, lastname: lastname, phone: phone, email: email,
                    specialization: spec, branch: branch, licence: licence, address: address, type: type, imageurl: imageurl }
            ];
            doctors_1.default.insertMany(documentsToInsert);
            user_1.default.insertMany(documentsToInsert);
            res.json({ 'message': 'Doctor added' });
        };
        this.addExam = (req, res) => {
            let username = req.body.username;
            let titleText = req.body.title;
            doctors_1.default.findOne({ 'username': username }, (err, doctor) => {
                if (err)
                    console.log(err);
                else {
                    if (doctor) {
                        let title = {
                            text: titleText
                        };
                        doctors_1.default.updateOne({ 'username': doctor.username }, { $push: { 'doctorExams': title } }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                                //res.json({'message': 'ok'})
                            }
                        });
                        user_1.default.updateOne({ 'username': doctor.username }, { $push: { 'doctorExams': title } }, (err, resp) => {
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
        this.removeExam = (req, res) => {
            let username = req.body.username;
            let titleText = req.body.title;
            doctors_1.default.findOne({ 'username': username }, (err, doctor) => {
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
exports.DoctorsController = DoctorsController;
//# sourceMappingURL=doctors.controller.js.map