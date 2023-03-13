const User = require("../model/signupmodel");
const Authenticate = require("../model/authenticatemodel");
const Mail = require("../signUpAuthentication");

module.exports.setSignupDetails = async (req, res, next) => {
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
        const otpTime = new Date();
        otpTime.setMinutes(otpTime.getMinutes() + 5);
        const options = { timeZone: "Asia/Kolkata" }; // set the time zone to India Standard Time
        const time = otpTime.toLocaleString("en-US", options);


        setTimeout(async () => {
          const checkNewOtp = await Authenticate.findOne({ email });
          const now = new Date();
          const options = { timeZone: "Asia/Kolkata" }; // set the time zone to India Standard Time
          const currentTime = now.toLocaleString("en-US", options);
          if (checkNewOtp.time < currentTime) {
            const otpExpire = await Authenticate.updateOne(
              { email: email },
              {
                generated_otp: null,
              }
            );
          } 
        }, 300000);
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
        return res.json({ status: true});
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
    console.log(LoginCheck);
    if (LoginCheck && LoginCheck.password === password) {
      return res.json({
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
