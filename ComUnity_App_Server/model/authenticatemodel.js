const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: "$__dirname/../.env" });

 

const DB = process.env.DATABASE

mongoose
   .connect(DB, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .catch((err)=>{
    console.log("error ocurred",err.message);
   })


const userShema= new mongoose.Schema({
  email: String,
  generated_otp: String,
  time:String
})

  // creating and exportins ids 
const user_id=mongoose.model('authenticate Accounts',userShema)
module.exports=user_id