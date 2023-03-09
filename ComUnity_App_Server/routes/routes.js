const {setSignupDetails,checkLoginCredential}=require("../controllers/userDetails")
// import {setSignupDetails} from "../controllers/userDetails"
const router=require("express").Router() 

router.post("/setSignupDetails",setSignupDetails)
router.get("/checkLogin",checkLoginCredential)
module.exports=router; 