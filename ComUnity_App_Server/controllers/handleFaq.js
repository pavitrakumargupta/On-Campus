const Faq = require("../model/faqModel");


module.exports.uploadQuestion = async (req, res, next) => {
    try {
      const newQuestion=req.body
      let createdBy=req.user
      newQuestion.createdBy=createdBy
      const createFaq=await Faq.create(newQuestion)
      return res.json(createFaq);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Inetrnal server error"});
    }
  };

  module.exports.getAllfaq = async (req, res, next) => {
    try {
      const news=await Faq.find().populate("createdBy", "name profilePitchure");
      if(news.length>0){
        return res.status(200).json(news);
      }
      return res.status(200).json(news);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Inetrnal server error"});
    }
  };
  

  module.exports.editfaq = async (req, res, next) => {
    try {
      const {_id,answer} = req.body;
      const editedFaq = await Faq.findByIdAndUpdate(
        _id,
        { $push: { answers: answer } },
        { new: true }
      );
      return res.json(editedFaq.answers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error"});
    }
  };