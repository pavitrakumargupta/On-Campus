const router=require("express").Router() 
const {setSignupDetails,checkLoginCredential}=require("../controllers/userDetails")
const {createPost,getAllPost}=require("../controllers/handlePost")



// handle User
router.post("/setSignupDetails",setSignupDetails)
router.post("/checkLogin",checkLoginCredential)


// handlePost
router.post("/createPost",createPost)
router.get("/getAllPost",getAllPost)



// export
module.exports=router; 