const express=require("express")
const cors =require("cors")
const userRoutes =require("./routes/routes.js")
const mongoose = require('mongoose');
const Unread=require("./model/unreadModel.js")
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app=express()
require("dotenv").config();

const DB = process.env.DATABASE

mongoose
   .connect(DB, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .then(() => {
     console.log('DB connection suceesfull!');
   }).catch((err)=>{
    console.log("error ocurred",err.message);
   })

app.use(cors())  
app.use(express.json()) 
 
app.use("/",userRoutes)


app.use(notFound);
app.use(errorHandler);

app.get('/', function(req, res){
    res.send('Running the On-Campus server app');
  });

const server=app.listen(process.env.PORT ||5000,()=>{
    console.log('server is listening on',process.env.PORT); 
})       

let pendingMessage={}
const io=require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:"https://on-campus.netlify.app"
  }
})
io.on("connection",(socket)=>{
  console.log("connected with socket.io");

  socket.on('setup', async (userData, callback) => {
    socket.userData = userData; 
    socket.join(userData._id);
    const unread=await Unread.findOne({ user: user._id})
    
    // Emit the 'connected' event first
    socket.emit('connected');
    // Call the acknowledgment callback with the response data
    if (typeof callback === 'function') {
      callback({});
    }
  });
  

  socket.on('join chat',(room)=>{
    socket.join(room.chatId);
    delete pendingMessage[room.user]
    console.log('user Joined the room: '+room.chatId);


  })

  socket.on("newMessgae",(newMessageRecieved)=>{
    var chat =newMessageRecieved.chat
    if(!chat.users) return console.log("chat.users not defined");
    const notRecievedMessage={
      message:newMessageRecieved,
      users:[]
    }
    chat.users.map((user)=>{
      if(user._id==newMessageRecieved.sender._id) return;
      if (io.sockets.adapter.rooms.has(user._id)) {
        socket.in(user._id).emit("message recieved",newMessageRecieved);
      }else{
        Unread.findOneAndUpdate(
          { user: user._id, "unreadMessage.chatId": newMessageRecieved.chat._id },
          { $inc: { "unreadMessage.$.unreadMessage": 1 } },
          { upsert: true, new: true },
          (err, updatedUser) => {
            if (err) {
              console.error("Error updating unread count:", err);
            }
          }
        );
      }
    })
  })

  socket.on("typing",(message)=>{
    var typingUser =message.users.find(key=>key._id===message.sender._id);
    let details={
      ...message,
      typingUser
    }
    if(!message.users) return console.log("chat.users not found");
    message.users.map((user)=>{
      if(user==typingUser) return;
      socket.in(user._id).emit("typing message recieved",details)
    })
  })
  socket.on("disconnect", () => {
    if (socket.userData) {
      console.log("user disconnected", socket.userData._id);

      // Perform any necessary cleanup or actions here
      // For example, you might remove the user from active user lists or update their status.
    } else {
      console.log("user disconnected, but no user data found.");
    }
  });
})