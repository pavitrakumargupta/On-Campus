const mongoose = require('mongoose');
const dotenv = require('dotenv');


const userShema= new mongoose.Schema({
  title: String,
  subTitle: String,
  document:String,
  date:String,
  deadline:String,
  createdBy: {type:mongoose.Schema.Types.ObjectId,ref:"User"}
},
{
  timestamps:true
})

  // creating and exportins ids 
const user_id=mongoose.model('News',userShema)
module.exports=user_id