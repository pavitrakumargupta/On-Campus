const Notes = require("../model/notesModel");


module.exports.uploadNotes = async (req, res, next) => {
    try {
      const newNotes=req.body
      let createdBy=req.user
      newNotes.createdBy=createdBy
      console.log(newNotes.createdBy);
      const createNotes=await Notes.create(newNotes)
      return res.json(createNotes);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Inetrnal server error"});
    }
  };

  module.exports.getNotes = async (req, res, next) => {
    try {
      const {courseName,branchName,semester,subject} =req.body
      const notes=await Notes.find({courseName,branchName,semester,subject}).populate("createdBy", "name profilePitchure");
      if(notes.length>0){
        return res.status(200).json(notes);
      }
      return res.status(200).json(notes);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Inetrnal server error"});
    }
  };
  