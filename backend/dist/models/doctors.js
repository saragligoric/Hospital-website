"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Doctor = new Schema({
    _id: {
        type: mongodb_1.ObjectId
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: Number
    },
    specialization: {
        type: String
    },
    imageurl: {
        type: String
    },
    branch: {
        type: String
    },
    licence: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    doctorExams: {
        type: Array
    }
});
exports.default = mongoose_1.default.model("DoctorsModel", Doctor, 'doctors');
//# sourceMappingURL=doctors.js.map