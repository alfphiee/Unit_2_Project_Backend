import mongoose from "mongoose";

const profileInfoSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber : {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    }

})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ['coach', 'athelete']
    },
    profileInfo : profileInfoSchema
})

const User = mongoose.model('User', userSchema)
export default User