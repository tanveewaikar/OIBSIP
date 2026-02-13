const express = require("express"); //importing Express library
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();   //creating backend app

//middleware 
app.use(cors());
app.use(express.json());

console.log("ENV TEST:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected successfully"))
.catch((err)=> console.log("MongoDB connection Error",err))
//Test route
app.get('/',(req,res)=>{
res.send("pizza backend running")
})

const PORT = process.env.PORT || 5000  
app.listen(PORT , ()=>{   //Starts the server
console.log(`server is running on PORT ${PORT}`);
})
