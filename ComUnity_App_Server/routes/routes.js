const router=require("express").Router() 
const {setSignupDetails,checkLoginCredential}=require("../controllers/userDetails")
const {createPost,getAllPost,editPost,deletePost}=require("../controllers/handlePost")
const {uploadNotes,getNotes}=require("../controllers/handleNotes")
const {fetchMessage}=require("../controllers/handleMessage")



// handle User
router.post("/setSignupDetails",setSignupDetails)
router.post("/checkLogin",checkLoginCredential)


// handlePost
router.post("/createPost",createPost)
router.get("/getAllPost",getAllPost)
router.post("/editPost",editPost)
router.post("/deletePost",deletePost)


// handle notes
router.post("/uploadNotes",uploadNotes)
router.post("/getNotes",getNotes)

// handle message
router.post("/authenticateUser",fetchMessage)


// export
module.exports=router; 