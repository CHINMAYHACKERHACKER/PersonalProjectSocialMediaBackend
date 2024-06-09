const jwt = require("jsonwebtoken");
const signUpModel = require("../model/signUpModel.js");

exports.userLogin = async (req, res) => {
    try {
        let { body: { mobileNumberOrEmail, password } } = req
        let userExist = await signUpModel.findOne({ email_mobile_number: mobileNumberOrEmail });
        if (userExist && userExist.password === password) {
            const accessToken = jwt.sign({ Email: userExist.email_mobile_number, loggedIn_user_id: userExist._id },
                "jwt-access-token-secret-key", { expiresIn: '5m' })
            const refreshToken = jwt.sign({ Email: userExist.email_mobile_number, loggedIn_user_id: userExist._id },
                "jwt-refresh-token-secret-key")
            return res.json({ login: true, message: "LoggedIn Sucessfully", accessToken: accessToken, refreshToken: refreshToken })
        }
        else {
            return res.status(401).json({ login: false, message: "Invalid login details. Please try again" });
        }
    } catch (error) {
        return res.status(500).json({ login: false, message: "We’re currently processing too many requests. Please try again later" });
    }
}