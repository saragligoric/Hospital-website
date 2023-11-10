import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let ExaminationRequest = new Schema({
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

export default mongoose.model("ExaminationsRequestsModel", ExaminationRequest, 'examinationsRequests')