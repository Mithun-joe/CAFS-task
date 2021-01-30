const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = User = mongoose.model('user', UserSchema)


