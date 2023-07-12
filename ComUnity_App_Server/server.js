const express=require("express")
const cors =require("cors")
const userRoutes =require("./routes/routes.js")

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
