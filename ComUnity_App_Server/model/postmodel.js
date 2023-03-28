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
  type: String,
  tittle: String,
  content: String,
  coverImageLink:String,
  userName:String,
  userId:String,
  userImage:String,
  comment:Array,
  Like:Array,
})

  // creating and exportins ids 
const user_id=mongoose.model('Posts',userShema)
module.exports=user_id