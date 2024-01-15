import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    coachId: {
        type: mongoooe.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    athleteContact: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    }
})

const Session = mongoose.model('Session', sessionSchema)
export default Session