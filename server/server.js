const express=require("express");
const app=express();
const port=8000;
const dotenv = require("dotenv");
dotenv.config();
const dbConfig=require("./config/dbConfig")



app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})