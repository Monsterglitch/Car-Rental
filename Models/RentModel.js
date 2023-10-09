const mongoose = require("mongoose");

const RentSchema = new mongoose.Schema({ 
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
    },
});

const RentModel= mongoose.model('RentModel', RentSchema)
module.exports = RentModel