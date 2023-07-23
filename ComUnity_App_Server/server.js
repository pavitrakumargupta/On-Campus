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
