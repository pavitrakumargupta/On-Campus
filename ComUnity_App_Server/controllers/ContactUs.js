const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports.ContactUs=async(req,res)=> {
  try {
    
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "Oauth2",
        user: "programmer0231@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOption = {
      from: "On-Campus <programmer0231@gmail.com>",
      to: "programmer0231@gmail.com",
      subject: `A new Request For Contact from email- ${req.body.email} name- ${req.body.name}`,
      text: req.body.message,
    };

    const result = await transport.sendMail(mailOption);
    return res.json("Messgae sended Sucessfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Intaernal server Error");
    
  }
}

