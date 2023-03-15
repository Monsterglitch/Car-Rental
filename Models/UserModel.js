const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{ 
        type: String, 
        required: [true, 'Must provide name'], 
        trim: true,
        maxlength: [20, "Length cannot be bigger"] 
    }, 
    password:{
        type: String,
        required: [true, 'Must provide password'] 
    },
    email:{
        type: String
    },
    phone:{
        type: Number 
    },
})

module.exports = mongoose.model('UserData', UserSchema)