import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    coachId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    athleteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
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
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'completed', 'cancelled']
    }
})

const Session = mongoose.model('Session', sessionSchema)
export default Session