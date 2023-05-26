const router=require("express").Router() 
const {setSignupDetails,checkLoginCredential,updateProfile}=require("../controllers/userDetails")
const {createPost,getAllPost,editPost,deletePost}=require("../controllers/handlePost")
const {uploadNotes,getNotes}=require("../controllers/handleNotes")
const { addMessage, getMessages } = require("../controllers/messageController");
 



// handle User
router.post("/setSignupDetails",setSignupDetails)
router.post("/checkLogin",checkLoginCredential)
router.post("/updateProfile",updateProfile)

// handlePost
router.post("/createPost",createPost)
router.get("/getAllPost",getAllPost)
router.post("/editPost",editPost)
router.post("/deletePost",deletePost)

 
// handle notes
router.post("/uploadNotes",uploadNotes)
router.post("/getNotes",getNotes)



router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);


// export
module.exports=router; 