const Post = require("../model/postmodel");

module.exports.createPost = async (req, res, next) => {
  try {
    const {
      type,
      tittle,
      content,
      coverImageLink,
      userName,
      userId,
      userImage,
      comment,
      Like
    } = req.body;
    console.log();
 

    const createPost = await Post.create({
        type,
        tittle,
        content,
        coverImageLink,
        userName,
        userId,
        userImage,
        comment,
        Like
      });
      return res.json({ msg: "Your Post have been created", status: true });
  } catch (ex) {
    next(ex);
    return res.json({ msg: "An Error occured", status: false });
  }
};
module.exports.getAllPost = async (req, res, next) => {
  try {
    const PostData=await Post.find()
    return res.json(PostData);
  } catch (error) {
    return res.json({ msg: "An Error occured in Loading data", status: false });
  }
 
}
