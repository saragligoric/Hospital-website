import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
})

export default mongoose.model("AppointmentsModel", Appointment, 'appointments')