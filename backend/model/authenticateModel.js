const mongoose = require('mongoose');
const dotenv = require('dotenv');


const userShema= new mongoose.Schema({
  email: String,
  generated_otp: String,
},
{
  timestamps:true
})

  // creating and exportins ids 
const user_id=mongoose.model('authenticate Accounts',userShema)
module.exports=user_id
