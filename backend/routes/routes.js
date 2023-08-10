const router=require("express").Router() 
const {genrateOtp,createUser,authUser,allUser,ForgotPassword,updateProfile,getUserbyId,cronJob}=require("../controllers/userDetails")
const {createPost,getAllPost,editPost,deletePost,editLike_Comment}=require("../controllers/handlePost")
const {uploadNotes,getNotes}=require("../controllers/handleNotes")
const {accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup}=require("../controllers/handleChat")
const {sendMessage,allMessages}=require("../controllers/handleMessage")
const {uploadNews,getAllNews} =require("../controllers/handleNews")
const {uploadQuestion,getAllfaq,editfaq}=require("../controllers/handleFaq")
const  {createPoll,getAllPolls,editPollVotes}=require("../controllers/handlePolls")
const {ContactUs}=require("../controllers/ContactUs")
const { protect } = require("../middleware/authMiddleware");



// Contact us
router.post("/ContactUs",ContactUs)


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
router.route("/Blogs/createPost").post(protect,createPost) 
router.route("/Blogs/getAllPost").get(protect,getAllPost)
router.post("/Blogs/editPost",editPost) 
router.post("/Blogs/deletePost",deletePost)
router.post("/Blogs/editSocial",editLike_Comment)
 
// handle notes
router.route( "/Notes/uploadNotes").post(protect,uploadNotes)
router.route("/Notes/getNotes").post(protect,getNotes)


//handle News
router.route( "/News/uploadNews").post(protect,uploadNews)
router.route("/News/getAllNews").get(protect,getAllNews)

// handle Faq
router.route( "/faq/uploadFaq").post(protect,uploadQuestion)
router.route( "/faq/addAnswer").post(protect,editfaq)
router.route("/faq/getAllfaq").get(protect,getAllfaq)

// handle Poll
router.route( "/Polls/createNewPoll").post(protect,createPoll)
router.route( "/Polls/pollVote").post(protect,editPollVotes)
router.route("/Polls/getAllPolls").get(protect,getAllPolls)

// export
module.exports=router; 