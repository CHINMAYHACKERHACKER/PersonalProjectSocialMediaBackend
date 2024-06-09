const router = require("express").Router();
const { verifyUser } = require("../verifytoken/tokenVerify.js");
const { friendRequest, getFriendRequest, friendRequestAccept } = require("../controller/friendRequestController.js");

router.post("/friendRequest", verifyUser, friendRequest);
router.post("/getFriendRequest", verifyUser, getFriendRequest);
router.post("/friendRequestAccept", verifyUser, friendRequestAccept);

module.exports = router;