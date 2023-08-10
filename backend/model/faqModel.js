const mongoose = require('mongoose');
const dotenv = require('dotenv');


const userShema= new mongoose.Schema({
  type: String,
  question: String,
  content: String,
  createdBy: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  answers:[
    {
        user:mongoose.Schema.Types.ObjectId,
        content:String
    }
  ],
  Like:Array,
},
{
  timestamps:true
})

  // creating and exportins ids 
const user_id=mongoose.model('Faq',userShema)
module.exports=user_id