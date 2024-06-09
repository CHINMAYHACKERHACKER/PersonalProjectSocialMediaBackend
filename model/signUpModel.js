const mongoose = require("mongoose");

let signUpSchema = mongoose.Schema({
    email_mobile_number: {
        type: String
    },
    password: {
        type: String
    },
    Image: {
        type: String,
    },
    friendRequest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup"
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup"
    }],
    friendSentRequest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup"
    }]
}, {
    timestamps: true
})

let signUpModel = mongoose.model("signup", signUpSchema);

module.exports = signUpModel;