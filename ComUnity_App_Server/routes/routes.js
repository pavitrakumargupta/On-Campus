const router=require("express").Router() 
const {setSignupDetails,checkLoginCredential,ForgotPassword,updateProfile,getUserbyId,cronJob}=require("../controllers/userDetails")
const {createPost,getAllPost,editPost,deletePost,editLike_Comment}=require("../controllers/handlePost")
const {uploadNotes,getNotes}=require("../controllers/handleNotes")

 



// handle User
router.post("/setSignupDetails",setSignupDetails)
router.post("/checkLogin",checkLoginCredential)
router.post("/forgotPassword",ForgotPassword)
router.post("/updateProfile",updateProfile)
router.get("/getUserbyId",getUserbyId)
router.get("/cronJobrun",cronJob)

// handlePost
router.post("/Blogs/createPost",createPost)
router.get("/Blogs/getAllPost",getAllPost)
router.post("/Blogs/editPost",editPost)
router.post("/Blogs/deletePost",deletePost)
router.post("/Blogs/editSocial",editLike_Comment)
 
// handle notes
router.post("/Notes/uploadNotes",uploadNotes)
router.post("/Notes/getNotes",getNotes)






// export
module.exports=router; 