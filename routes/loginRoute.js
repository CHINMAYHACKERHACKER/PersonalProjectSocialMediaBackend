const router=require('express').Router();
const {userLogin}=require("../controller/loginController.js");

router.post("/userLogin",userLogin);

module.exports=router;
