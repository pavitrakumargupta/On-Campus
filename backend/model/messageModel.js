const mongoose = require('mongoose');
const dotenv = require('dotenv');


const messageModel= new mongoose.Schema({
   sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
   content:{type:String,trim:true},
   chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
  },
  {
    timestamps:true
  }
  )

  // creating and exportins ids 
const Message=mongoose.model('Message',messageModel)
module.exports=Message