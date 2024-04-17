const router = require('express').Router();
const { userHomePage } = require("../controller/homePageController.js");
const { verifyUser } = require("../verifytoken/tokenVerify.js");

router.get("/userHomePage", verifyUser, userHomePage);

module.exports = router;
