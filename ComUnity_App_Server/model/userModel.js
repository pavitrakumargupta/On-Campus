const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const userShema= new mongoose.Schema({
  name:String,
  username: String,
  email: String,
  password: String,
  profilePitchure:{type:String,default:"https://firebasestorage.googleapis.com/v0/b/otp-sender-382116.appspot.com/o/blogs%2Fimage_20230709_213651_5ecde_default-avatar-profile-icon-vector-social-media-user-photo-183042379.webp?alt=media&token=1c4b1f6e-0d72-4b20-b44f-e3586a464229"}
  },
  {
    timestamps:true
  }
)


userShema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userShema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userShema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    const salt = await bcrypt.genSalt(10);
    this._update.password = await bcrypt.hash(this._update.password, salt);
  }
  next();
});

  // creating and exportins ids 
const User=mongoose.model('User',userShema)
module.exports=User