const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    role: {
        type: String,
        default: 'student',
        enum: ['student', 'instructor', 'onboarder']
    },
    date: {
        type: Date,
        default: Date.now(),
    
    },
    image : {
        type: String,
        default: 'avatar.png'
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User