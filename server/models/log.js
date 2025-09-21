const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    timeIn: {
        type: Date,
        required: false
    },
    timeOut: {
        type: Date,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Logs', logsSchema)
