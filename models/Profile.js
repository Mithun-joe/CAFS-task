const mongoose = require('mongoose');


const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    mobileNo: {
        type: String
    },
    gender: {
        type: String
    },
    role: {
        type: String,
    },
    skills: {
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    resume: {
        type: String
    },
    dob: {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);