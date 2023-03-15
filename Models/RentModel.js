const mongoose = require("mongoose");

const RentSchema = new mongoose.Schema({
    // name:{ 
    //     type: String, 
    //     required: [true, 'Must provide name'], 
    //     trim: true,
    //     maxlength: [20, "Length cannot be bigger"] 
    // }, 
    username: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    pickup:{
        type: String,
        required: true
    },
    return:{
        type: String,
        required: true
    },
    pay:{
        type: Number
        // required: true,
        // validate : {
        //     validator : Number.isInteger,
        //     message   : '{VALUE} is not an integer value'
        // }
    },
});

module.exports = mongoose.model('RentData', RentSchema)