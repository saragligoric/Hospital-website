import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Registration = new Schema({
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
    phone: {
        type: String
    },
    email: {
        type: String
    },
    imageurl: {
        type: String
    }
})

export default mongoose.model('RegistrationModel', Registration, 'registrationRequests');