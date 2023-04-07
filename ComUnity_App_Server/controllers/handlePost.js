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
      Like,
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
      Like,
    });
    return res.json({ msg: "Your Post have been created", status: true });
  } catch (ex) {
    next(ex);
    return res.json({ msg: "An Error occured", status: false });
  }
};
module.exports.getAllPost = async (req, res, next) => {
  try {
    const PostData = await Post.find();
    return res.json(PostData);
  } catch (error) {
    return res.json({ msg: "An Error occured in Loading data", status: false });
  }
};

module.exports.editPost = async (req, res, next) => {
  try {
    const { _id, type, tittle, content, coverImageLink } = req.body;

    const userData = await Post.findByIdAndUpdate(_id, {
      type: type,
      tittle: tittle,
      content: content,
      coverImageLink: coverImageLink,
    });
    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.json({ msg: "An Error occured in Loading data", status: false });
  }
};


module.exports.deletePost = async (req, res, next) => {
  try {
    const _id = req.body._id;
    const result = await Post.deleteOne({ _id: _id });
    return res.json({ msg: "done delete" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "An Error occured in Loading data", status: false });
  }
};
