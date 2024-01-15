import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    attachments: [String]
},
{ timestamps: true })

const Note = mongoose.model('Note', noteSchema)

export default Note