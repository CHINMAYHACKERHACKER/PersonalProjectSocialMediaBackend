const signUpModel = require("../model/signUpModel.js");

exports.getUserProfile = async (req, res) => {
    try {
        let { body: { userId } } = req;
        let userProfileRes = await signUpModel.findById(userId).select('-password');
        return res.status(200).json({ message: "User Profile fetched successfully", userProfileRes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}