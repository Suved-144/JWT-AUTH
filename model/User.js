const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        min:3, 
        max : 255

    },
    email:{
        type : String,
        required : true,
        min : 3,
        max :200

    },
    password:{
        type : String,
        required : true,
        min : 3,
        max : 1024

    },
    date:{
        type : Date,
        default : Date.now
    }


})
module.exports= mongoose.model('Userre',userSchema);