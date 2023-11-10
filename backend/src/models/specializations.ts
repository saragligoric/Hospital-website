import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Specialization = new Schema({
    title: {
        type: String
    }
})

export default mongoose.model('SpecializationModel', Specialization, 'Specializations')