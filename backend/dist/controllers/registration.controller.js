"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationController = void 0;
const registration_1 = __importDefault(require("../models/registration"));
const user_1 = __importDefault(require("../models/user"));
const patients_1 = __importDefault(require("../models/patients"));
const rejected_1 = __importDefault(require("../models/rejected"));
class RegistrationController {
    constructor() {
        this.insertreq = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let address = req.body.address;
            let phone = req.body.phone;
            let email = req.body.email;
            let imageurl = req.body.imageurl;
            const documentsToInsert = [
                { username: username, password: password, type: 0, firstname: firstname, lastname: lastname, address: address, phone: phone, email: email, imageurl: imageurl }
            ];
            registration_1.default.insertMany(documentsToInsert);
            res.json({ 'message': 'Request sent' });
        };
        this.accept = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let address = req.body.address;
            let phone = req.body.phone;
            let email = req.body.email;
            let imageurl = req.body.imageurl;
            const documentsToInsert = [
                { username: username, password: password, type: 0, firstname: firstname, lastname: lastname, address: address, phone: phone, email: email, imageurl: imageurl }
            ];
            user_1.default.insertMany(documentsToInsert);
            patients_1.default.insertMany(documentsToInsert);
            registration_1.default.deleteOne({ 'firstname': firstname, 'lastname': lastname, 'username': username, 'password': password,
                'address': address, 'phone': phone, 'email': email, 'imageurl': imageurl }, (err, resp) => {
                if (err)
                    console.log(err);
                res.json({ 'message': 'Request sent' });
            });
        };
        this.reject = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let address = req.body.address;
            let phone = req.body.phone;
            let email = req.body.email;
            let imageurl = req.body.imageurl;
            registration_1.default.deleteOne({ 'firstname': firstname, 'lastname': lastname, 'username': username, 'password': password,
                'address': address, 'phone': phone, 'email': email, 'imageurl': imageurl }, (err, resp) => {
                if (err)
                    console.log(err);
                //res.json({'message': 'Request sent'})
            });
            const documentsToInsert = [
                { username: username, email: email }
            ];
            rejected_1.default.insertMany(documentsToInsert);
            res.json({ 'message': 'Request sent' });
        };
        this.getAllRegistrations = (req, res) => {
            registration_1.default.find({}, (err, examinations) => {
                if (err)
                    console.log(err);
                else
                    res.json(examinations);
            });
        };
    }
}
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration.controller.js.map