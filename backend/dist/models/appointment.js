"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Appointment = new Schema({
    patientUsername: {
        type: String
    },
    patientFirstname: {
        type: String
    },
    patientLastname: {
        type: String
    },
    doctorUsername: {
        type: String
    },
    doctorFirstname: {
        type: String
    },
    doctorLastname: {
        type: String
    },
    doctorBranch: {
        type: String
    },
    selectedDate: {
        type: String
    },
    selectedTime: {
        type: String
    },
    examTitle: {
        type: String
    },
    examDuration: {
        type: String
    },
    examPrice: {
        type: String
    }
});
exports.default = mongoose_1.default.model("AppointmentsModel", Appointment, 'appointments');
//# sourceMappingURL=appointment.js.map