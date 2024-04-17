const router=require("express").Router();
const {userSignUp}=require("../controller/signUpController.js");

router.post("/userSignUp",userSignUp);

module.exports=router;
