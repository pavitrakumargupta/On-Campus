const router=require("express").Router() 
const {genrateOtp,createUser,authUser,allUser,ForgotPassword,updateProfile,getUserbyId,cronJob}=require("../controllers/userDetails")
const {createPost,getAllPost,editPost,deletePost,editLike_Comment}=require("../controllers/handlePost")
const {uploadNotes,getNotes}=require("../controllers/handleNotes")
const {accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup}=require("../controllers/handleChat")
const {sendMessage,allMessages}=require("../controllers/handleMessage")
 
const { protect } = require("../middleware/authMiddleware");


// handle User
router.post("/User/genrateOtp",genrateOtp)
router.post("/User/createUser",createUser);
router.post("/User/authUser",authUser)
router.route("/User/allUser").get(protect,allUser)
 
router.post("/forgotPassword",ForgotPassword)
router.post("/updateProfile",updateProfile)
router.get("/getUserbyId",getUserbyId)
router.get("/cronJobrun",cronJob)



// chat Routes
router.route("/Chat").post(protect,accessChat)
router.route("/Chat").get(protect,fetchChats)
router.route("/Chat/group").post(protect,createGroupChat) 
router.route("/Chat/rename").put(protect,renameGroup)
router.route("/Chat/groupAdd").put(protect,addToGroup)
router.route("/Chat/groupRemove").put(protect,removeFromGroup)


//message  route
router.route("/message/:chatId").get(protect, allMessages);
router.route("/message").post(protect, sendMessage);

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