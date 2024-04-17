const mongoose = require("mongoose");

let signUpSchema = mongoose.Schema({
    email_mobile_number: {
        type: String
    },
    password:{
        type:String
    }
},{
    timestamps: true 
})

let signUpModel=mongoose.model("signup",signUpSchema);

module.exports=signUpModel;