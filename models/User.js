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
    lastLogin: {
        type: Date,
        required: true
    },
    profileInfo : profileInfoSchema
})

const User = mongoose.model('User', userSchema)
export default User