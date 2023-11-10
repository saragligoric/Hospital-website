import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
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
    address: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    imageurl: {
        type: String
    },
    doctorExams: {
        type: Array
    }
})

export default mongoose.model('UserModel', User, 'users')