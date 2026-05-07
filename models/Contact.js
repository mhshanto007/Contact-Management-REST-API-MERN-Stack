const mongoose = require('mongoose')

//create schema
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
    required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:String,
    
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
//create model
module.exports = mongoose.model('Contact', contactSchema)