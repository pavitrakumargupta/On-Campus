const mongoose = require("mongoose");
const dotenv = require("dotenv");


const userShema = new mongoose.Schema({
  courseName: String,
  branchName: String,
  semester: String,
  subject: String,
  tittle: String,
  notesLink: String,
  createdBy: {type:mongoose.Schema.Types.ObjectId,ref:"User"}
},
{
  timestamps:true
});

// creating and exportins ids
const user_id = mongoose.model("Notes", userShema);
module.exports = user_id;
