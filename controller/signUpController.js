const signUpModel = require("../model/signUpModel.js");
exports.userSignUp = async (req, res) => {
    try {
        let { body: { mobileNumberOrEmail, password } } = req;
        let reqObj = {
            email_mobile_number: mobileNumberOrEmail,
            password: password
        }
        let insertSignupData = new signUpModel(reqObj);
        let saveSignUpData = await insertSignupData.save();
        if (saveSignUpData) {
            res.status(200).json({ signUp: true, message: "Signed Up Sucessfully" });
        }
        else {
            res.status(500).json({ signUp: false, message: "Internal Server Error" });
        }
    } catch (error) {
        res.status(500).json({ signUp: false, message: "Internal Server Error" });
    }
}