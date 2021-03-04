const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    }
},
{timestamps: true})

const user = mongoose.model("users", userSchema)
module.exports = user;