const express=require("express")
const cors =require("cors")
const userRoutes =require("./routes/routes.js")
const socket = require("socket.io");

const app=express()
require("dotenv").config();


app.use(cors())
app.use(express.json())
 
app.use("/",userRoutes)

app.get('/', function(req, res){
    res.send('Running the CollegeDesk server app');
  });

const server=app.listen(process.env.PORT ||5000,()=>{
    console.log('server is listening on',process.env.PORT); 
})       

// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });