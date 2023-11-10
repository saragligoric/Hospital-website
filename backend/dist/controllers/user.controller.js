"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const rejected_1 = __importDefault(require("../models/rejected"));
const mongodb_1 = require("mongodb");
const patients_1 = __importDefault(require("../models/patients"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getUserEmail = (req, res) => {
            let email = req.body.email;
            user_1.default.findOne({ 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getRejectedUsername = (req, res) => {
            let username = req.body.username;
            rejected_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.editUser = (req, res) => {
            let username = req.body.username;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let address = req.body.address;
            let email = req.body.email;
            let phone = req.body.phone;
            user_1.default.updateOne({ 'username': username }, { $set: { 'firstname': firstname, 'lastname': lastname,
                    'address': address, 'phone': phone, 'email': email } }, (err, resp) => {
                if (err)
                    console.log(err);
                //else res.json({'message': 'updated'})
            });
            patients_1.default.updateOne({ 'username': username }, { $set: { 'firstname': firstname, 'lastname': lastname,
                    'address': address, 'phone': phone, 'email': email } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'updated' });
            });
        };
        this.updateUser = (req, res) => {
            //zapravo je u tabeli user, nije doctor bas
            let user = req.body.user;
            let doctor = req.body.doctor;
            const objectId = new mongodb_1.ObjectId(user._id);
            //console.log(objectId)
            user_1.default.updateOne({ _id: objectId }, { $set: { 'firstname': doctor.firstname, 'lastname': doctor.lastname,
                    'address': doctor.address, 'phone': doctor.phone, 'email': doctor.email, 'specialization': doctor.specialization,
                    'branch': doctor.branch, 'licence': doctor.licence } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'updated' });
            });
        };
        this.getRejectedEmail = (req, res) => {
            let email = req.body.email;
            rejected_1.default.findOne({ 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.oldPassword = (req, res) => {
            let password = req.body.password;
            user_1.default.findOne({ 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.update = (req, res) => {
            let username = req.body.username;
            let newpass = req.body.newpass;
            user_1.default.updateOne({ 'username': username }, { $set: { 'password': newpass } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Password successfully changed' });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map