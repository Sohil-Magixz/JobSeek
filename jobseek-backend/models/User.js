import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type:String, required: true, unique:true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    likedJobs: {type: Array},

    otp: {type: String},
    otpExpiry: {type: Date},
    isVerified: {type: Boolean, default: false},
});

export default mongoose.model('User',userSchema);