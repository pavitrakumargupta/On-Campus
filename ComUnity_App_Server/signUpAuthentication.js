const nodemailer= require('nodemailer')
const {google} =require('googleapis')
const dotenv = require('dotenv');
dotenv.config({ path: "$__dirname/./.env" });

const CLIENT_ID= process.env.CLIENT_ID
const CLIENT_SECRET= process.env.CLIENT_SECRET
const REDIRECT_URI= process.env.REDIRECT_URI
const REFRESH_TOKEN= process.env.REFRESH_TOKEN

const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

async function SendMail(email) {
  try {
    
    const genrated_otp=Math.floor(Math.random() * 10000 +1);
    const accessToken=await oAuth2Client.getAccessToken()
 
    const transport=nodemailer.createTransport({
      service:'gmail',
      auth:{
        type:'Oauth2',
        user:'pavitragupta021@gmail.com',
        clientId : CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken:REFRESH_TOKEN,
        accessToken:accessToken
      }
    })
 
    const mailOption={
      from: 'ComUnity <pavitragupta021@gmail.com>',
      to:  email,
      subject: 'Your ComUnity account has OTP request',
      text: `Hello ${email} A request has been received For OTP in your ComUnity account.  \n Your OTP(one time password) to set password is : ${genrated_otp}\n For any query please contact to pavitragupta021@gmail.com `,
    }
    
    const result=await transport.sendMail(mailOption) 
    return genrated_otp
  } catch (error) {
    console.log(error);
  }
}
 
module.exports= SendMail