import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
})

export default mongoose.model("ReportsModel", Report, 'reports')