const User = require("../model/signupmodel");
// const Posts=require("../postModel")
const Authenticate = require("../model/authenticatemodel");
const Mail = require("../signUpAuthentication");

module.exports.setSignupDetails = async (req, res, next) => {
  const cron = require("node-cron");
  try {
    const { username, email, password, otp } = req.body;

    const creating_user = async () => {
      try {
        var user = await User.create({
          username,
          email,
          password,
        });
        return res.json({
          status: true,
          msg: "Your Account has been Sucessfully created",
        });
      } catch (error) {
        return res.json({
          msg: "Your account is not been created please try after some time",
          status: false,
        });
      }
    };
    const authenticate_email = async () => {
      try {
        const OtpCheck = await Authenticate.findOne({ email });
        var generated_otp = await Mail(email);

        setTimeout(async() => {
          const otpExpire =await Authenticate.updateOne({ email:email}, {
            generated_otp: "",
          });
        }, 30000);
        if (OtpCheck) {
          const Otp_update = await Authenticate.findByIdAndUpdate(
            OtpCheck._id,
            {
              generated_otp: generated_otp,
            }
          );
        } else {
          var email_authenticate = await Authenticate.create({
            email,
            generated_otp,
          });
        }
        return res.json({ status: true, otp: generated_otp });
      } catch (error) {
        console.log(error);
        return res.json({ msg: "Invalid email", status: false });
      }
    };
    if (otp === "") {
      const emailCheck = await User.findOne({ email });
      if (emailCheck) {
        return res.json({
          msg: "your email is already registered ",
          status: false,
        });
      }
      return authenticate_email();
    } else {
      const OtpCheck = await Authenticate.findOne({ email });

      if (OtpCheck.generated_otp === otp) {
        return await creating_user();
      } else {
        return res.json({ msg: "You have entered a wrong otp", status: false });
      }
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
        msg: "You have Sucessfully Logined in your account",
        status: true,
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