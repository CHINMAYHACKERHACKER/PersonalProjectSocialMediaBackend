const router = require("express").Router();
const { verifyUser } = require("../verifytoken/tokenVerify.js");
const { getUserList } = require("../controller/getUserListController.js");

router.post("/getUserList", verifyUser, getUserList);

module.exports = router;