import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Doctor = new Schema({
    _id: {
        type: ObjectId
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
})

export default mongoose.model("DoctorsModel", Doctor, 'doctors')