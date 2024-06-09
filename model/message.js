const mongoose = require("mongoose");

let messageSchema = new mongoose.Schema({
    //^The Person Who Send Messages
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup"
    },
    //^The Person Who Receive Messages
    recepintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup"
    },
    //^There Are Two Types of Message That User Can Send One Is Text and Another Is Image
    messageType: {
        type: String,
        enum: ["text", "image"]
    },
    message: {
        type: String,
    },
    imageUrl:{
        type:String
    },
    timestamps:{
        type:Date,
        default:Date.now
    }
})
let messageModel=mongoose.model("message",messageSchema);

module.exports=messageModel;