const route = require("express").Router();
const { verifyUser } = require("../verifytoken/tokenVerify.js");
const { uploadImage,getUploadedImageInfo } = require("../controller/uploadImageController.js");
const multer = require('multer');

// Configure Multer to stream file uploads directly to disk
const storage = multer.diskStorage({
    destination: 'public/data/uploads/',
    filename: function (req, file, cb) {
        // generate a unique filename
        cb(null, file.originalname);
    }
});
const upload = multer({ 
    storage: storage,
    inMemory: false
});

route.post("/userImage", verifyUser, upload.single('Image'), uploadImage);
route.post("/getUploadedImageInfo", verifyUser, getUploadedImageInfo);


module.exports = route;
