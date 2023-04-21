// const dotenv = require('dotenv');
// dotenv.config({ path: "$__dirname/../.env" });
// const axios = require("axios");
// const CHAT_ENGINE_PROJECT_ID = process.env.CHAT_ENGINE_PROJECT_ID;

// module.exports.fetchMessage=async (req,res,next)=>{
//     try {
//         const { username, secret } = req.body;
//         const messageResponse = await axios.get("https://api.chatengine.io/users/me/", {
//           headers: {
//             "Project-ID": CHAT_ENGINE_PROJECT_ID,
//             "User-Name": username,
//             "User-Secret": secret,
//           },
//         });
//         return res.status(messageResponse.status).json(messageResponse.data);
//       } catch (e) {
//         return res.status(e.response.status).json(e.response.data);
//       }

// }