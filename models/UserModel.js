const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor introduce tu nombre"],
        trim: true,
        
    },
    email: {
        type: String,
        required: [true, "Por favor introduce tu email"],
        trim: true,
        unique: true
    },
   password: {
       type: String,
       required: [true, "Por favor introduce tu password"],
       trim: true,
   },
   repeat: {
       type: String,
       required: [true, "Por favor, vuelve a introducir tu contraseña"],
       trim: true,
    },
    register: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', UserSchema)