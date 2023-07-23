const Notes = require("../model/notesModel");


module.exports.uploadNotes = async (req, res, next) => {
    try {
      const newNotes=req.body

      const createNotes=await Notes.create(newNotes)
      return res.json(createNotes);
    } catch (error) {
      console.log(error);
      return res.json({ msg: "Notes Upload", status: false });
    }
  };

  module.exports.getNotes = async (req, res, next) => {
    try {
      const {courseName,branchName,semester,subject} =req.body
      const notes=await Notes.find({
        courseName:courseName,
        branchName:branchName,
        semester:semester,
        subject,subject
      })
      return res.json(notes);
    } catch (error) {
      console.log(error);
      return res.json({ msg: "Can't find Notes", status: false });
    }
  };
  