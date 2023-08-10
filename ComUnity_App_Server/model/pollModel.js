const mongoose = require('mongoose');
const dotenv = require('dotenv');


const userShema= new mongoose.Schema({
  type: String,
  question: String,
  createdBy: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  options:[
    {
        optionName:String,
        votes:{
          type:Number,
          default:0
        }
    }
  ],
  totalVotes:[{
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    optionId:String
  }]
},
{
  timestamps:true
})

  // creating and exportins ids 
const user_id=mongoose.model('Poles',userShema)
module.exports=user_id