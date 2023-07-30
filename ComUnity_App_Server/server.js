const express=require("express")
const cors =require("cors")
const userRoutes =require("./routes/routes.js")
const mongoose = require('mongoose');
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
    res.send('Running the CollegeDesk server app');
  });

const server=app.listen(process.env.PORT ||5000,()=>{
    console.log('server is listening on',process.env.PORT); 
})       


const io=require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:"http://localhost:3000"
  }
})
io.on("connection",(socket)=>{
  console.log("connected with socket.io");

  socket.on('setup',(userData)=>{
    socket.join(userData._id)
   
    socket.emit('connected')
  })

  socket.on('join chat',(room)=>{
    socket.join(room);
    console.log('user Joined the room: '+room);
  })

  socket.on("newMessgae",(newMessageRecieved)=>{
    var chat =newMessageRecieved.chat
    if(!chat.users) return console.log("chat.users not defined");
    chat.users.map((user)=>{
      if(user._id==newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved",newMessageRecieved)
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
})