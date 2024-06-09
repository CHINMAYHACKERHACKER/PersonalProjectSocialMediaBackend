const route = require("express").Router();
const { verifyUser } = require("../verifytoken/tokenVerify.js");
const { getChatUserFriends } = require("../controller/getChatUserFriendsController.js");

route.post("/getAcceptedChatFriends", verifyUser, getChatUserFriends);

module.exports = route;