const User = require("../model/userModel");
const Authenticate = require("../model/authenticateModel");
const Mail = require("../authenticate/signUpAuthentication");
const generateToken =require("../authenticate/generateToken")

module.exports.genrateOtp = async (req, res) => {
  try {
    const newUser = req.body;
    if(!newUser.email|| !newUser.username ||!newUser.password ||!newUser.name){
      res.status(400).json({message:"Please Enter all the Fields"})
    }else{

    
    const checkUserExist = async () => {
      const existingUserByEmail = await User.findOne({ email: newUser.email });
      const existingUserByUsername = await User.findOne({
        username: newUser.username,
      });

      if (existingUserByEmail) {
        return { status: true, key: "email" };
      } else if (existingUserByUsername) {
        return { status: true, key: "username" };
      } else {
        return { status: false };
      }
    };
    const isUserExist = await checkUserExist();
    if (isUserExist.status) {
      res
        .status(409)
        .json({ message: `${isUserExist.key} is already registered.` });
    } else {
      const generatedOtp = await Mail(newUser.email);
      await Authenticate.findOneAndUpdate(
        { email: newUser.email },
        { $set: { generated_otp: generatedOtp } },
        { upsert: true, new: true }
      );
      setTimeout(()=>{
        const OtpCheck =  Authenticate.findOneAndUpdate({ email, generated_otp: generated_otp });
      },300000)
      res
        .status(202)
        .json({ message: "Please enter the OTP to verify your email." });
    }
  }
  } catch (error) {
    console.error("Error:", error);
    res 
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const newUser = req.body;

    if(!newUser.email|| !newUser.username ||!newUser.password ||!newUser.otp){
      res.status(400).json({message:"Please Enter all the Fields"})
    }
    const verifyOtp = await Authenticate.findOne({ email: newUser.email });
    if (verifyOtp && verifyOtp.generated_otp === newUser.otp) {
      await User.create(newUser);
      res
        .status(201)
        .json({ message: "Your account has been successfully created." });
    } else {
      res
        .status(401)
        .json({ message: "Incorrect OTP entered. Authentication failed." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};


module.exports.authUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide both email and password",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
          username: user.username,
          email: user.email,
          name:user.name,
          _id: user._id.valueOf(),
          profilePicture: user.profilePitchure,
          token: generateToken(user._id)
      });
    }

    return res.status(401).json({
      message: "Please enter the correct email or password",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "An error occurred. Please try again later.",
    });
  }
};


module.exports.allUser=async(req,res)=>{
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
}




module.exports.ForgotPassword = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const authenticate_email = async () => {
      const UserCheck = await User.findOne({ email });
      if (UserCheck) {
        var generated_otp = await Mail(email);        
        const Otp_update = await Authenticate.findOneAndUpdate(
          { email: email },
          { $set: { generated_otp: generated_otp } },
          { upsert: true, new: true }
        );
        setTimeout(()=>{
          const OtpCheck =  Authenticate.findOneAndUpdate({ email, generated_otp: generated_otp });
        },300000)
      } else {
        return res.json({ msg: "Invalid email", status: false });
      }
      return res.json({ msg: "otp sended", status: true });
    };
    if (otp === "") {
      authenticate_email();
      
    } else {
      const UserCheck = await User.findOne({ email });
      const OtpCheck = await Authenticate.findOne({ email });
      if (OtpCheck.generated_otp == otp) {
        return res.json({ 
          msg: "otp verified",
          id: UserCheck._id,
          status: true,
        });
      } else {
        return res.json({ msg: "Invalid OTP", status: false });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server Error", status: false });
  }
};

module.exports.getUserbyId = async (req, res, next) => {
  try {
    const user = await User.findById(req.query.id).lean();
    // delete user.password;
    return res.json({ user, status: true });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server Error", status: false });
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const updatingDetail = req.body.profile;
    if (updatingDetail.oldPassword) {
      let updatepassw = await User.findOneAndUpdate(
        { _id: req.body.id, password: updatingDetail.oldPassword },
        { password: this.updateProfile.newpassword }
      );
       
      if (updatepassw) {
        return res.json({ msg: "Password Updated Succesfully", status: true });
      } else {
        return res.json({ msg: "Incorrect Current Password", status: false });
      }
    }
    const update = await User.findByIdAndUpdate(req.body.id, updatingDetail);
    return res.json({ msg: "profileUpdated", status: true });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server Error", status: false });
  }
};

module.exports.cronJob = async (req, res, next) => {
  try {
    console.log("running cron job");
    return res.json({ msg: "everything working fine ", status: true });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal server Error", status: false });
  }
};
