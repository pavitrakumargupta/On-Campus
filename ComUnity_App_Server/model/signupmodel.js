const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: "$__dirname/../.env" });

const DB = process.env.DATABASE

mongoose
   .connect(DB, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .then(() => {
     console.log('DB connection suceesfull!');
   }).catch((err)=>{
    console.log("error ocurred",err.message);
   })


const userShema= new mongoose.Schema({
  name:String,
  username: String,
  email: String,
  password: String,
  })

  // creating and exportins ids 
const user_id=mongoose.model('ComUnity_user_Detail',userShema)
module.exports=user_id