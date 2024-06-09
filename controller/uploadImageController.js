const signUpModel = require("../model/signUpModel.js");
exports.uploadImage = async (req, res) => {
    try {
        let { body: { userId }, file: { destination, filename } } = req;
        let userImageUpdate = await signUpModel.updateOne({
            _id: userId
        }, { Image: `${destination}`+`${filename}` }
        )
        if (userImageUpdate.acknowledged) {
            return res.status(200).json({ message: true });
        }
        else {
            return res.status(204).json({ message: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getUploadedImageInfo = async (req, res) => {
    try {
        let { body: { userId } } = req;
        let uploadedImageRes = await signUpModel.findOne({ _id: userId }).select('-password');
        if (uploadedImageRes) {
            return res.status(200).json({ message: true, uploadedImageRes });
        }
        else {
            return res.status(204).json({ message: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}