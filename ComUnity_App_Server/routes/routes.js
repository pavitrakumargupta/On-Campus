const router=require("express").Router() 
const {setSignupDetails,checkLoginCredential,ForgotPassword,updateProfile,getUserbyId}=require("../controllers/userDetails")
const {createPost,getAllPost,editPost,deletePost,editLike_Comment}=require("../controllers/handlePost")
const {uploadNotes,getNotes}=require("../controllers/handleNotes")
// const { addMessage, getMessages } = require("../controllers/messageController");
 



// handle User
router.post("/setSignupDetails",setSignupDetails)
router.post("/checkLogin",checkLoginCredential)
router.post("/forgotPassword",ForgotPassword)
router.post("/updateProfile",updateProfile)
router.get("/getUserbyId",getUserbyId)

// handlePost
router.post("/Blogs/createPost",createPost)
router.get("/Blogs/getAllPost",getAllPost)
router.post("/Blogs/editPost",editPost)
router.post("/Blogs/deletePost",deletePost)
router.post("/Blogs/editSocial",editLike_Comment)
 
// handle notes
router.post("/Notes/uploadNotes",uploadNotes)
router.post("/Notes/getNotes",getNotes)



// router.post("/addmsg/", addMessage);
// router.post("/getmsg/", getMessages);


// export
module.exports=router; 