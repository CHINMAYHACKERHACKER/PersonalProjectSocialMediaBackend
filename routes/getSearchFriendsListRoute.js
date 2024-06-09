const route = require("express").Router();
const { verifyUser } = require("../verifytoken/tokenVerify.js");
const { getSearchFriendList } = require("../controller/getSearchFriendsListController.js");

route.post("/searchFriendList", verifyUser, getSearchFriendList);

module.exports = route;