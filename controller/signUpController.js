const signUpModel = require("../model/signUpModel.js");
exports.userSignUp = async (req, res) => {
    try {
        let { body: { mobileNumberOrEmail, password } } = req;
        let reqObj = {
            email_mobile_number: mobileNumberOrEmail,
            password: password,
            Image: null,
            friendButton: null
        }
        let userExist = await signUpModel.findOne({ email_mobile_number: mobileNumberOrEmail });
        if (userExist) {
            return res.status(200).json({ signUp: false, message: "Account with this email or mobile number already exists" });
        }
        else {
            let insertSignupData = new signUpModel(reqObj);
            let saveSignUpData = await insertSignupData.save();
            if (saveSignUpData) {
                return res.status(200).json({ signUp: true, message: "Signed Up Sucessfully" });
            }
            else {
                return res.status(204).json({ signUp: false, message: "We’re currently processing too many requests. Please try again later" });
            }
        }
    } catch (error) {
        return res.status(500).json({ signUp: false, message: "We’re currently processing too many requests. Please try again later" });
    }
}