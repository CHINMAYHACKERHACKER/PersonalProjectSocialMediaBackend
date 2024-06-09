const route = require("express").Router();
const { unFriend } = require("../controller/chatController.js");
const { verifyUser } = require("../verifytoken/tokenVerify.js");

route.post("/unFriend", verifyUser, unFriend);

module.exports = route;