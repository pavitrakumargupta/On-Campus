const News = require("../model/newsModel");


module.exports.uploadNews = async (req, res, next) => {
    try {
      const newNews=req.body
      let createdBy=req.user
      newNews.createdBy=createdBy
      const createNotes=await News.create(newNews)
      return res.json(createNotes);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Inetrnal server error"});
    }
  };

  module.exports.getAllNews = async (req, res, next) => {
    try {
      const news=await News.find().populate("createdBy", "name profilePitchure");
      if(news.length>0){
        return res.status(200).json(news);
      }
      return res.status(200).json(news);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Inetrnal server error"});
    }
  };
  