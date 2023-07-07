const User = require("../model/signupmodel");
const Authenticate = require("../model/authenticatemodel");
const Mail = require("../signUpAuthentication");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "$__dirname/../.env" });

const CHAT_ENGINE_PRIVATE_KEY = process.env.CHAT_ENGINE_PRIVATE_KEY;

module.exports.setSignupDetails = async (req, res, next) => {
  try {
    const { firstname, lstname, username, email, password, otp } = req.body;

    const creating_user = async () => {
      let name = firstname + " " + lstname;

      var user = await User.create({
        name,
        username,
        email,
        password,
      });
      return user;
    };

    const authenticate_email = async () => {
      try {
        const OtpCheck = await Authenticate.findOne({ email });
        var generated_otp = await Mail(email);
        const otpTime = new Date();
        otpTime.setMinutes(otpTime.getMinutes() + 5);
        const options = { timeZone: "Asia/Kolkata" }; // set the time zone to India Standard Time
        const time = otpTime.toLocaleString("en-US", options);

        // setTimeout(async () => {
        //   const checkNewOtp = await Authenticate.findOne({ email });
        //   const now = new Date();
        //   const options = { timeZone: "Asia/Kolkata" }; // set the time zone to India Standard Time
        //   const currentTime = now.toLocaleString("en-US", options);
        //   if (checkNewOtp.time < currentTime) {
        //     const otpExpire = await Authenticate.updateOne(
        //       { email: email },
        //       {
        //         generated_otp: null,
        //       }
        //     );
        //   }
        // }, 300000);

        if (OtpCheck) {
          const Otp_update = await Authenticate.findByIdAndUpdate(
            OtpCheck._id,
            {
              generated_otp: generated_otp,
              time: time,
            }
          );
        } else {
          var email_authenticate = await Authenticate.create({
            email,
            generated_otp,
            time,
          });
        }
        return res.json({ status: true });
      } catch (error) {
        console.log(error);
        return res.json({ msg: "Invalid email", status: false });
      }
    };

    const sendOtp = async () => {
      const userCheck = await User.findOne({
        $or: [{ email: email }, { username: username }],
      });
      if (userCheck) {
        const notUnique = userCheck.email === email ? "email" : "username";
        return res.json({
          msg: `your ${notUnique} is already registered `,
          status: false,
        });
      }
      return authenticate_email();
    };

    const createAccount = async () => {
      const user = await Authenticate.findOne({ email });
      if (user.generated_otp === otp) {
        let newUser;
        try {
          newUser = await creating_user();
        } catch (error) {
          return res.json({
            msg: "Your account is not been created please try after some time",
            status: false,
          });
        }
        const secret = newUser._id.valueOf();
        // Creating Chat engine for User

        try {
          let first_name = firstname;
          let last_name = lstname;
          const chatEngine = await axios.post( 
            "https://api.chatengine.io/users/",
            { username, secret, email, first_name, last_name },
            { headers: { "Private-Key": CHAT_ENGINE_PRIVATE_KEY } }
          );
        } catch (error) {
          console.log(error);
        }

        return res.json({
          status: true,
          msg: "Your Account has been Sucessfully created",
        });
      } else {
        return res.json({ msg: "You have entered a wrong otp", status: false });
      }
    };

    if (otp === "") {
      return sendOtp();
    } else {
      return createAccount();
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.checkLoginCredential = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const LoginCheck = await User.findOne({ email });

    if (LoginCheck && LoginCheck.password === password) {
      return res.json({
        status: true,
        data: {
          username: LoginCheck.username,
          email: LoginCheck.email,
          userId: LoginCheck._id.valueOf(),
          profilePitchure:LoginCheck.profilePitchure
        },
      });
    } else {
      return res.json({
        msg: "Please enter correct email or password",

        status: false,
      });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.ForgotPassword = async (req, res, next) => {
  try {
    const {email,otp}=req.body
    const authenticate_email = async () => {
        const OtpCheck = await Authenticate.findOne({ email });
        const UserCheck = await User.findOne({ email });
        if (UserCheck && OtpCheck) {
          var generated_otp = await Mail(email);
          const otpTime = new Date();
          otpTime.setMinutes(otpTime.getMinutes() + 5);
          const options = { timeZone: "Asia/Kolkata" }; // set the time zone to India Standard Time
          const time = otpTime.toLocaleString("en-US", options);
          const Otp_update = await Authenticate.findByIdAndUpdate(
            OtpCheck._id,
            {
              generated_otp: generated_otp,
              time: time,
            }
          );
        } else {
          return res.json({ msg: "Invalid email", status: false });
        }
        return res.json({msg:"otp sended",status: true })
    };
    if(otp===""){
      authenticate_email() 
    }else{
      const UserCheck = await User.findOne({ email });
      const OtpCheck = await Authenticate.findOne({ email });
      if(OtpCheck.generated_otp==otp){
        return res.json({msg:"otp verified",id:UserCheck._id,status: true })
      }else{
        return res.json({msg:"Invalid OTP",status: false })
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({msg:"Internal server Error",status: false })
  }
}


module.exports.getUserbyId = async (req, res, next) => {
  try {
    const user=await User.findById(req.query.id).lean()
    delete user.password;
    return res.json({user,status: true })
  } catch (error) {
    console.log(error);
    return res.json({msg:"Internal server Error",status: false })
  }
}

module.exports.updateProfile = async (req, res, next) => {
  try {
    const updatingDetail=req.body.profile
    if(updatingDetail.oldPassword){
      let updatepassw=await User.findOneAndUpdate({_id:req.body.id,password:updatingDetail.oldPassword},{password:this.updateProfile.newpassword})
      if(updatepassw){
        return res.json({msg:"Password Updated Succesfully",status: true })
      }
      else{
        return res.json({msg:"Incorrect Current Password",status: false })
      }
    }
    const update=await User.findByIdAndUpdate(req.body.id,updatingDetail)
    return res.json({msg:"profileUpdated",status: true })
  } catch (error) {
    console.log(error);
    return res.json({msg:"Internal server Error",status: false })
  }
}