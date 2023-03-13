const {setSignupDetails,checkLoginCredential}=require("../controllers/userDetails")
// import {setSignupDetails} from "../controllers/userDetails"
const router=require("express").Router() 

router.post("/setSignupDetails",setSignupDetails)
router.post("/checkLogin",checkLoginCredential)
module.exports=router; 