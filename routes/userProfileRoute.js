const route = require("express").Router();
const { verifyUser } = require("../verifytoken/tokenVerify.js");
const { getUserProfile } = require("../controller/userProfileController.js");

route.post("/getUserProfile", verifyUser, getUserProfile);

module.exports = route;