const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "$__dirname/../.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log("error ocurred", err.message);
  });

const userShema = new mongoose.Schema({
  courseName: String,
  branchName: String,
  semester: String,
  subject: String,
  tittle: String,
  notesLink: String,
  userId:String
});

// creating and exportins ids
const user_id = mongoose.model("Notes", userShema);
module.exports = user_id;
