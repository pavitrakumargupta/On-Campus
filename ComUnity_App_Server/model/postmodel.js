const mongoose = require('mongoose');
const dotenv = require('dotenv');


const userShema= new mongoose.Schema({
  type: String,
  tittle: String,
  content: String,
  coverImageLink:String,
  userName:String,
  userId:String,
  userImage:String,
  comment:Array,
  Like:Array,
},
{
  timestamps:true
})

  // creating and exportins ids 
const user_id=mongoose.model('Posts',userShema)
module.exports=user_id