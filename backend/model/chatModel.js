const mongoose = require('mongoose');
const dotenv = require('dotenv');


const chatModel= new mongoose.Schema({
  chatName:{type:String,trim:true},
  isGroupChat:{type:Boolean,default:false},
  users: [{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
  latestMessage: {type:mongoose.Schema.Types.ObjectId,ref:"Message"},
  groupAdmin: {type:mongoose.Schema.Types.ObjectId,ref:"User"}
  },
  {
    timestamps:true
  }
  )

  // creating and exportins ids 
const Chat=mongoose.model('Chat',chatModel)
module.exports=Chat