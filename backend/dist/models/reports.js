"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Report = new Schema({
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
    doctorSpecialization: {
        type: String
    },
    selectedDate: {
        type: String
    },
    selectedTime: {
        type: String
    },
    nextDate: {
        type: String
    },
    reason: {
        type: String
    },
    diagnosis: {
        type: String
    },
    therapy: {
        type: String
    }
});
exports.default = mongoose_1.default.model("ReportsModel", Report, 'reports');
//# sourceMappingURL=reports.js.map