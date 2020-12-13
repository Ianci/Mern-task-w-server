const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    task: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Task', TaskSchema)