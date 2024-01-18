import mongoose from "mongoose";

const athleteSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }
})

const Athlete = mongoose.model('Athlete', athleteSchema)

export default Athlete