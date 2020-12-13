const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    todo: {
        type: String,
        required: [true, "Por favor, completa este campo"],
        trim: true,
    },
    state: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }
})

module.exports = mongoose.model('Todo', TodoSchema)