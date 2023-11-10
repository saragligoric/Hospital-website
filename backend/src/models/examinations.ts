import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Examination = new Schema({
    _id: {
        type: ObjectId
    },
    specialization: {
        type: String
    },
    title: {
        type: String
    },
    duration: {
        type: String
    },
    price: {
        type: String
    }
})

export default mongoose.model("ExaminationsModel", Examination, 'examinations')